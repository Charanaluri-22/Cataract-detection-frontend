import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Model() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000); // Change 5000 to the number of milliseconds you want the modal to stay open
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Data Policy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          At [Catract Detection App], we respect your privacy and are committed to protecting your personal and health information. When you use our cataract detection service, we collect minimal necessary data, which may include some personal details and the images required for analysis. Your data is used solely to provide and improve our service. We implement robust security measures to safeguard your information and do not share it with third parties without your consent. By using our service, you agree to this policy. If you have any questions or concerns, please contact us at [Contact Information].


          </Typography>
        </Box>
      </Modal>
    </div>
  );
}