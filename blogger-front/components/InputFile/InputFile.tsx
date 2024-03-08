import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Img from "@/components/Img";
import Loading from "../Loading";
import FirebaseServices from "@/services/FirebaseServices";
import cn from "@/utils/classNames";
import imgDelete from "@/public/assets/trash-can.svg";
import imgAssetFallback from "@/public/assets/admin-logo.svg";
import styles from "./InputFile.module.css";
import logger from "@/utils/logger";

/**
 * Reusable Input File Image component. Requires setting a max. number of files accepted.
 * Automatically uploads files to Firebase and returns Firebase File URL.
 * @param {string} name - Files input name. Firebase images are stored using this name.
 * @param {function} handleFiles - Callback for files uploaded. Will be invoked with an array of Firebase URL each time an image is uploaded or deleted.
 * @param {string} label - optional label shown to upload images.
 */

interface InputFileProps {
  name: string;
  label?: string;
  size?: "small" | "medium" | "large";
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  fallbackAssetsUrl?: string | object;
  className?: string;
  fileName?: string;
  maxSize?: number;
  value?: string | string[];
  handleChange: (value: string | string[]) => void;
  required?: boolean;
}

const InputFile = ({
  name,
  label,
  size,
  placeholder,
  errorMessage,
  fallbackAssetsUrl,
  className,
  fileName,
  maxSize,
  value,
  handleChange,
  ...props
}: InputFileProps) => {
  const [loading, setLoading] = useState(false); // True while uploading to Firebase.
  const [dragging, setDragging] = useState(false); // True while dragging file into uploading area.
  const [imgValue, setImgValue] = useState(value);

  /** Handles file dragging action into uploading area.
   * Enables focus style for the dragging area. */
  const handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(true);
  };

  /** Removes focus styles for the dragging area. */
  const handleDragExit = () => {
    setDragging(false);
  };

  /** Processes files dropped in the uploading area. */
  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  /** Processes files uploaded manually from the input area clicked. */
  const handleUpload = (e) => processFile(e.target.files[0]);

  /** Validates file size and uploads file to Firebase.
   * Returns generated Firebase file URL. */
  const processFile = async (file) => {
    if (file.size <= maxSize) {
      const { ok, data } = await FirebaseServices.uploadFile(file, fileName);
      if (ok) {
        setImgValue(data);
        return data;
      } else {
        toast.error("Lo sentimos, ha ocurrido un error al subir el archivo.");
      }
    } else {
      toast.error(
        `El archivo debe pesar hasta ${Math.floor(maxSize / (1024 * 1024))}MB`
      );
    }
    return null;
  };

  /** Removes file from file list. */
  const removeFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setImgValue(null);
  };

  return (
    <>
      <div
        className={cn(styles.input, dragging ? styles.dragging : "", className)}
        onDragExit={handleDragExit}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Loading className={styles.loading} show={loading} />
        {placeholder && !value?.length && (
          <span className={cn(styles.placeholder, "text-gray-400")}>
            {placeholder}
          </span>
        )}
        <label className="w-full h-full absolute left-0 top-0 cursor-pointer text-black">
          <input
            name={name}
            onInput={handleUpload}
            hidden
            {...props}
            type="file"
          />
        </label>

        {imgValue && (
          <div className={cn(styles.image, "w-screen")}>
            <button
              className="h-8 w-8 p-2 top-0 right-0 absolute bg-main rounded-lg flex justify-center items-center cursor-pointer"
              onClick={removeFile}
            >
              <Img src={imgDelete} alt="Eliminar" />
            </button>
            <div>
              <Img
                fallback={fallbackAssetsUrl}
                src={imgValue}
                alt="Archivo"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </>
  );
};

InputFile.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fallbackAssetsUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

InputFile.defaultProps = {
  fallbackAssetsUrl: imgAssetFallback,
  label: "",
  placeholder: "Añadir imagen",
  size: "large",
  maxSize: 1024 * 1024 * 10, // 10MB
};

export default InputFile;
