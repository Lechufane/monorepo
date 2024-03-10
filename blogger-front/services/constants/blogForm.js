export const inputs = [
  {
    id: 1,
    type: "text",
    name: "title",
    placeholder: "Title",
    className: "text-black",
    value: "",
    maxLength: 40,
  },
  {
    id: 2,
    type: "textarea",
    name: "content",
    placeholder: "Description",
    maxLength: 500,
    value: "",
  },
  {
    id: 3,
    type: "file",
    accept: "image/*",
    multiple: false,
    name: "image",
    value: "",
    placeholder: "Blog image",
    size: "large",
    maxSize: 1000000,
    fileName: "blog",
    fallbackAssetsUrl: "https://firebasestorage.googleapis.com/v0/",
  },
];

export const validator = (field, value) => {
  if (!value) return "This field is required";

  // const parsedValue = parseInt(value);
  const properFormats = {
    //test if value has only letters, allow spaces and accents. It must be at least 7 characters long
    title:
      /^[a-zA-ZÀ-ÿ\s]{3,40}$/g.test(value) || //test if value has only letters, allow spaces and accents and it's not longer than 40 characters
      "You must write a title with at least 3 characters",
    content:
      //test if value it's longer than 250 characters and shorter than 1000
      (value.length > 250 && value.length < 1000) ||
      "You must write at least 250 characters",
    image: true,
  };
  if (properFormats[field] === true) return "";
  else return properFormats[field] ?? "";
};
