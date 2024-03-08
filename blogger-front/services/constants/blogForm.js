export const inputs = [
  {
    id: 1,
    type: "text",
    name: "title",
    placeholder: "Title",
    className: "text-black",
  },
  {
    id: 2,
    type: "textarea",
    name: "description",
    placeholder: "Description",
    maxLength: 500,
  },
  {
    id: 3,
    type: "file",
    accept: "image/*",
    multiple: false,
    name: "logoUrl",
    placeholder: "Blog image",
    size: "large",
    maxSize: 1000000,
    fileName: "blog",
    fallbackAssetsUrl: "https://firebasestorage.googleapis.com/v0/",
    className: "relative w-1/2 h-1/2 bg-gray-200 rounded-lg",
  },
];

export const validator = (field, value) => {
  if (!value) return "Este campo es obligatorio";

  // const parsedValue = parseInt(value);
  const properFormats = {
    //test if value has only letters, allow spaces and accents. It must be at least 7 characters long
    title:
      /^[a-zA-ZÀ-ÿ\s]{3,40}$/g.test(value) || //test if value has only letters, allow spaces and accents and it's not longer than 40 characters
      "Este campo es inválido",
    content:
      //test if value it's not longer than 200 characters
      value.length < 250 || "Este campo es inválido",
    image: true,
  };
  if (properFormats[field] === true) return "";
  else return properFormats[field] ?? "";
};
