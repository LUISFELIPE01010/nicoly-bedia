
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import WhatsAppFormModal from './WhatsAppFormModal';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const ServiceModal = ({ isOpen, onClose, title, content }: ServiceModalProps) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-8 border-none shadow-2xl">
          <DialogHeader>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-5 w-5 text-gray-rose" />
              <span className="sr-only">Close</span>
            </button>
            <DialogTitle className="text-2xl font-bold text-gray-rose mb-4 text-left">
              {title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-gray-rose/80 leading-relaxed text-left">
              {content}
            </p>
            
            <div className="pt-4">
              <button 
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-chrome-gold text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift shadow-lg hover:bg-chrome-dark transition-all w-full"
                aria-label="Entrar em contato via WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
                Quero conversar sobre isso
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <WhatsAppFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default ServiceModal;
