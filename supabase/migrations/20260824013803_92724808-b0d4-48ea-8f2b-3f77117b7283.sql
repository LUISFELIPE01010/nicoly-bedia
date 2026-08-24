ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS origin text NOT NULL DEFAULT 'manual';

CREATE TABLE IF NOT EXISTS public.lead_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  from_status public.lead_status,
  to_status public.lead_status NOT NULL,
  changed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.lead_status_history TO authenticated;
GRANT ALL ON public.lead_status_history TO service_role;

ALTER TABLE public.lead_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lead_status_history_select" ON public.lead_status_history
  FOR SELECT TO authenticated USING (company_id = public.get_user_company_id());

CREATE POLICY "lead_status_history_insert" ON public.lead_status_history
  FOR INSERT TO authenticated WITH CHECK (company_id = public.get_user_company_id());

CREATE INDEX IF NOT EXISTS lead_status_history_lead_idx ON public.lead_status_history(lead_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.log_lead_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_status_history (company_id, lead_id, from_status, to_status, changed_by)
    VALUES (NEW.company_id, NEW.id, NULL, NEW.status, auth.uid());
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.lead_status_history (company_id, lead_id, from_status, to_status, changed_by)
    VALUES (NEW.company_id, NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_status_history ON public.leads;
CREATE TRIGGER leads_status_history
  AFTER INSERT OR UPDATE OF status ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.log_lead_status_change();