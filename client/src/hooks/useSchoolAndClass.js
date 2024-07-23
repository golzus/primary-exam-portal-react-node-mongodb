import { useSelector } from "react-redux";

const useSchoolAndClass = () => {
  const { chosenClass, chosenSchool,chosenNameSchool,chosenNameClass } = useSelector((state) => state.schoolAndClass);
  return { chosenClass, chosenSchool,chosenNameSchool,chosenNameClass };
};

export default useSchoolAndClass;
