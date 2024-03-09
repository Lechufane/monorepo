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
  handleChange: (value: string | string[] | null) => void;
  handleFieldChange: (name: string) => (value: string) => void; // Add this prop
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
  maxSize = 1024 * 1024 * 10, // 10MB
  value,
  handleChange,
  handleFieldChange, // Add this prop
  ...props
}: InputFileProps) => {
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imgValue, setImgValue] = useState(value);

  const handleDrag = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(true);
  };

  const handleDragExit = () => {
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleUpload = (e: any) => processFile(e.target.files[0]);

  const processFile = async (file: any) => {
    setLoading(true);
    if (file?.size <= maxSize) {
      const { ok, data } = await FirebaseServices.uploadFile(file, fileName);
      if (ok) {
        setImgValue(data);
        handleChange({ target: { name, value: data } } as any); // Update form state here
        setLoading(false);
        return data;
      } else {
        toast.error("Lo sentimos, ha ocurrido un error al subir el archivo.");
        setLoading(false);
      }
    } else {
      toast.error(
        `El archivo debe pesar hasta ${Math.floor(maxSize / (1024 * 1024))}MB`
      );
      setLoading(false);
    }
    return null;
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setImgValue("");
    handleChange(null); // Update form state here
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
        <label className="absolute left-0 top-0 cursor-pointer text-black  object-contain h-full w-full">
          <input
            name={name}
            onInput={handleUpload}
            hidden
            {...props}
            type="file"
          />
        </label>

        {imgValue && (
          <div className={cn(styles.image, "w-screen  ")}>
            <button
              className="h-8 w-8 p-2 top-0 right-0 absolute bg-main rounded-lg flex justify-center items-center cursor-pointer"
              onClick={removeFile}
            >
              <Img src={imgDelete} alt="Eliminar" />
            </button>
            <div>
              <Img
                fallback={fallbackAssetsUrl as string}
                src={imgValue as string}
                alt="Archivo"
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-lg"
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
  handleFieldChange: PropTypes.func.isRequired, // Add this prop
  maxSize: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fallbackAssetsUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string,
};

InputFile.defaultProps = {
  fallbackAssetsUrl: imgAssetFallback,
  label: "",
  placeholder: "Añadir imagen",
  size: "large",
  maxSize: 1024 * 1024 * 10, // 10MB
};

export default InputFile;
