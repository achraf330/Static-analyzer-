import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function SuccessDialog({ isOpen, onClose, email }: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've received your information and payment details. Your comprehensive crypto analysis will be delivered to <span className="font-semibold">{email}</span> within 24 hours.
          </p>
          <Button onClick={onClose} className="px-5 py-2">
            Close
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
