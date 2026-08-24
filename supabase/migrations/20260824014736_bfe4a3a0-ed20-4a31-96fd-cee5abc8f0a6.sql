ALTER TABLE public.lead_status_history DROP CONSTRAINT lead_status_history_lead_id_fkey,
  ADD CONSTRAINT lead_status_history_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;

ALTER TABLE public.interactions DROP CONSTRAINT interactions_lead_id_fkey,
  ADD CONSTRAINT interactions_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;

ALTER TABLE public.follow_ups DROP CONSTRAINT follow_ups_lead_id_fkey,
  ADD CONSTRAINT follow_ups_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;

ALTER TABLE public.appointments DROP CONSTRAINT appointments_lead_id_fkey,
  ADD CONSTRAINT appointments_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;

ALTER TABLE public.clients DROP CONSTRAINT clients_lead_id_fkey,
  ADD CONSTRAINT clients_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;

CREATE POLICY "lead_status_history_delete" ON public.lead_status_history
  FOR DELETE TO authenticated USING (company_id = public.get_user_company_id());

GRANT DELETE ON public.lead_status_history TO authenticated;