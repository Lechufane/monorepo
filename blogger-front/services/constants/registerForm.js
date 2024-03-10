export const inputs = [
  {
    id: 1,
    type: "text",
    name: "name",
    placeholder: "Name",
    className: "text-black",
    value: "",
    size: "large",
  },
  {
    id: 2,
    type: "text",
    name: "username",
    placeholder: "Username",
    className: "text-black",
    value: "",
  },
  {
    id: 3,
    type: "email",
    name: "email",
    placeholder: "Email",
    className: "text-black",
    value: "",
  },
];

export const validator = (field, value) => {
  if (!value) return "This field is required";

  const properFormats = {
    name:
      /^[a-zA-ZÀ-ÿ\s]{3,40}$/g.test(value) ||
      "You must write a name with at least 3 characters",
    username:
      /^[a-zA-ZÀ-ÿ\s]{3,40}$/g.test(value) ||
      "You must write a name with at least 3 characters",
    email:
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g.test(value) ||
      "You must write a valid email",
  };
  if (properFormats[field] === true) return "";
  else return properFormats[field] ?? "";
};
