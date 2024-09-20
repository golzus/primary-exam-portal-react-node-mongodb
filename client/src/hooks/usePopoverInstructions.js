import { useState, useCallback } from 'react';
import { Popover, Box, Typography } from '@mui/material';

// ה-Hook שלנו
const usePopoverInstructions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [instructions, setInstructions] = useState('');

  const handlePopoverOpen = useCallback((event, newInstructions) => {
    setAnchorEl(event.currentTarget);
    setInstructions(newInstructions); // מעדכן את התוכן של הפופאובר
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
    setInstructions(''); // מנקה את התוכן כשסוגרים
  }, []);

  const open = Boolean(anchorEl);

  const PopoverComponent = () => (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={{ p: 2, backgroundColor: '#800020', color: '#fff', borderRadius: '8px', maxWidth: '300px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', borderBottom: '2px solid #fff', pb: 1 }}>
          הוראות
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {instructions}
        </Typography>
      </Box>
    </Popover>
  );

  return { handlePopoverOpen, PopoverComponent };
};

export default usePopoverInstructions;
