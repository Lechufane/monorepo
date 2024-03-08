import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Img from '../Img';
import FirebaseServices from '@/services/FirebaseServices';
import profilePicTemplate from '@/public/assets/admin-logo.svg';
import iconDelete from '@/public/assets/trash-can.svg';
import cn from '@/utils/classNames';
import styles from './InputProfilePic.module.css';

/**
 * Reusable Input File Image component. Styled for profile picture upload.
 * This component is stateless, requires value and handleChange props.
 */
const InputProfilePic = ({ value, handleChange, className, fileName }) => {
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 5MB

  /**
   * Handles file upload to Firebase. Validates file type and size.
   * Uploads file and returns Firebase URL.
   */
  const handleFileUpload = async (e) => {
    if (loading) return;

    setLoading(true);
    const file = e.target.files[0];
    if (file?.type?.startsWith('image/') && file.size <= MAX_FILE_SIZE) {
      const { ok, data } = await FirebaseServices.uploadFile(file, fileName);
      if (ok) {
        handleChange(data);
      } else {
        toast.error('Lo sentimos, no pudimos subir la imagen');
      }
    } else {
      toast.info('El archivo debe ser una imagen de hasta 15MB');
    }
    setLoading(false);
  };

  const handleRemove = () => handleChange(null);

  return (
    <div
      className={cn(
        'shrink-0 relative max-w-[250px] max-h-[250px] w-[25vw] h-[25vw] flex justify-center items-center',
        styles.container,
        className
      )}
    >
      <label
        className={cn(
          styles.imgContainer,
          'block w-full h-full rounded-full overflow-hidden cursor-pointer',
          loading ? styles.loading : ''
        )}
      >
        <input
          name="profile-picture"
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          hidden
          multiple={false}
        />
        <Img
          src={value || profilePicTemplate}
          className={cn(
            'w-full h-full',
            value ? 'object-cover' : 'object-contain p-[25%]'
          )}
          alt="Imagen de perfil"
          width={400}
          height={400}
        />
        <div className={styles.loadingSpinner}></div>
      </label>
      <Img
        src={iconDelete}
        onClick={handleRemove}
        className={cn(
          'h-8 w-8 p-2 top-0 right-0 absolute bg-main rounded-lg flex justify-center items-center cursor-pointer'
        )}
        alt="Borrar foto"
      />
    </div>
  );
};

InputProfilePic.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  fileName: PropTypes.string,
};

InputProfilePic.defaultProps = {
  value: null,
  className: '',
  fileName: 'profile-picture',
};

export default InputProfilePic;
