interface AddCategoryModalProps {}
import { addCategory } from '@/app/helpers/api/category';
import { addCategoryOptions } from '@/app/helpers/api/category-swr-options';
import useCategories from '@/hooks/useCategories';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const AddCategoryModal = ({}: AddCategoryModalProps) => {
  const [open, setOpen] = useState(false);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate } = useCategories();

  const addCategoryHandler = async () => {
    if (categoryInputRef.current !== null) {
      if (categoryInputRef.current.value === '') {
        return;
      }
    }
    mutate(
      addCategory(categoryInputRef.current?.value as string),
      addCategoryOptions(categoryInputRef.current?.value as string)
    );
    setOpen(false);
  };
  return (
    <>
      <button onClick={handleOpen} className='hover:bg-indigo-500'>
        Create Category
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            New Category
          </Typography>
          <Typography
            id='modal-modal-description'
            component={'div'}
            sx={{ mt: 2 }}
          >
            <TextField
              id='standard-basic'
              label='Category Name'
              variant='standard'
              inputRef={categoryInputRef}
            />
          </Typography>
          <Button
            variant='contained'
            className='float-right'
            onClick={addCategoryHandler}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
