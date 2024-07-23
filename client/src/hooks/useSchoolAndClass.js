import { useSelector } from "react-redux";

const useSchoolAndClass = () => {
  const { chosenClass, chosenSchool } = useSelector((state) => state.schoolAndClass);
  return { chosenClass, chosenSchool };
};

export default useSchoolAndClass;
