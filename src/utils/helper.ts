
export const capitalizeWords = (value: string) => {
      return value
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
};

export const fadeUp = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
};
      
export const slideLeft = {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 }
};
      
export const slideRight = {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 }
};