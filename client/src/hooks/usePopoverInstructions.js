import { useState, useCallback } from 'react';
import { Popover, Box, Typography } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';

const usePopoverInstructions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [instructions, setInstructions] = useState([]);

  const handlePopoverOpen = useCallback((event, newInstructions) => {
    setAnchorEl(event.currentTarget);
    setInstructions(newInstructions.split('|').map(instruction => instruction.trim()));
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
    setInstructions([]);
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
      <Box sx={{ p: 3, backgroundColor: '#800020', color: '#fff', borderRadius: '8px', maxWidth: '320px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', borderBottom: '2px solid #fff', pb: 1 }}>
          הוראות
        </Typography>
        {instructions.map((instruction, index) => (
          <Box key={index} display="flex" alignItems="center" sx={{ mt: 2 }}>
            {/* אייקונים גדולים יותר */}
           
              <FaCheckCircle size={50} style={{ marginRight: '8px', color: '#fff' }} />
        
            <Typography variant="body1" sx={{ fontSize: '16px' }}>
              {instruction}
            </Typography>
          </Box>
        ))}
      </Box>
    </Popover>
  );

  return { handlePopoverOpen, PopoverComponent };
};

export default usePopoverInstructions;
