import Title from "@/components/Title";
import cn from "@/utils/classNames";

interface Props {
  title: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const ProfileLogo = ({ title, size = "medium", className }: Props) => {
  const randomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-gray-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div
        className={cn(
          "p-4 flex flex-col items-center justify-between",
          className
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center items-center mt-auto p-4 z-20 min-w-[250px] relative"
          )}
        >
          <div
            className={cn(
              randomColor(),
              " border-gray-200 border-2 rounded-full flex justify-center items-center",
              size === "small"
                ? "w-16 h-16"
                : size === "medium"
                ? "w-32 h-32"
                : size === "large"
                ? "w-72 h-72"
                : null
            )}
          >
            <p
              className={cn(
                "font-semibold text-center",
                size === "small"
                  ? "text-xs"
                  : size === "medium"
                  ? "text-5xl"
                  : size === "large"
                  ? "text-9xl"
                  : null
              )}
            >
              {title
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </p>
          </div>
          <Title
            title={title}
            topLeft
            className={cn(
              "font-semibold bg-red-600 z-20 absolute bottom-0",
              size === "small"
                ? "text-xs"
                : size === "medium"
                ? "text-3xl"
                : size === "large"
                ? "text-6xl"
                : null
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileLogo;
