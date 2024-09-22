


// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
// } from "react-router-dom";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import SiteLayout from "./components/layout/site/SiteLayout";
import DashLayout from "./components/layout/dash/DashLayout";
import SchoolList from "./features/companies/list/SchoolList";
import AddSchool from "./features/companies/add/AddSchool";
import UsersList from "./features/users/list/UsersList";
import AddUser from "./features/users/add/AddUser";
import SingleUser from "./features/users/view/SingleUser";
import LoginPage from "./features/auth/login/LoginPage";
import RequireAuth from "./features/auth/login/RequireAuth";
// import LayoutActions from "./components/actions/layout/LayoutActions";
import ListWord from "./features/actions/listWord/list/ListWord";
import AddWordsList from "./features/actions/listWord/add/AddWordsList";
import SingleListWord from "./features/actions/listWord/view/SingleListWord";
import AddClass from "./features/companies/addClass/AddClass";
import Students from "./features/companies/students/Students";
import SingleClass from "./features/companies/view/SingleClass";

import CurrentSchoolAndClass from "./features/companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
// import WordSpeaker from "./features/actions/listWord/add/WordSpeaker";
import Test from "./features/actions/listWord/test/Test";
// import ExaminerPage from "./features/actions/listWord/list/ExaminerPage";
// import Translation from "./features/actions/translate/Translation";
// import TextToSpeechComponent from "./features/actions/listWord/add/TextToSpeechComponent";
import PersistLogin from "./features/auth/PersistLogin";
// import Site from "./features/site/Site";
// import Logo from "./features/logo/Logo";
// import Web from "./features/web/Web";
import Todos from "./features/actions/todos/Todos";
import WelcomePage from "./WelcomePage";
import Words from "./features/actions/listWord/view/Words";
import ListMarkStudents from "./features/actions/ListMarkStudents";
// import TestsYouHaveToDo from "./features/TestsYouHaveToDo";
// import ListWordToDo from "./features/actions/ListWordToDo";
import CheckLoginNotRequired from "./features/CheckLoginNotRequired";
import WordsGame from "./features/actions/game/WordsGame";
import MemoryGame from "./features/actions/game/MemoryGame";
import MultiChoiceGame from "./features/actions/game/MultiChoiceGame";
import HangmanGame from "./features/actions/game/HangmanGame";
import MainPage from "./MainPage";
import Instructions from "./features/instructions/Instructions";
import MarksByStudent from "./features/actions/MarksByStudent";
import ScoreCharts from "./features/actions/graphs/ScoreCharts";
import MainGraphs from "./features/actions/graphs/MainGraphs";
import Play from "./features/actions/game/Play";
import StudentInstructions from "./features/instructions/StudentInstructions";
import Tips from "./features/actions/tips/Tips";
import GrammarRules from "./features/grammarRules/GrammarRules";
import PastSimpleRules from "./features/grammarRules/PastSimpleRules";
import FutureSimpleRules from "./features/grammarRules/FutureSimpleRules";
import VerbsExplanation from "./features/grammarRules/VerbsExplanation";
import IrregularVerbs from "./features/grammarRules/IrregularVerbs";
import PresentContinuousRules from "./features/grammarRules/PresentContinuousRules";
import Comments from "./features/comments/Comment";

// import PuzzleGame from "./features/actions/game/PuzzleGame";
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PersistLogin />}>
              <Route
                element={<RequireAuth allowRoles={["Teacher", "Student"]} />}
              >
                <Route path="/dash" element={<DashLayout />}>
                  <Route index element={<MainPage/>} /> 
                  <Route element={<RequireAuth allowRoles={["Teacher"]} />}>
                    <Route
                      path="dash/choose"
                      element={<CurrentSchoolAndClass />}
                    />
                    <Route path="users" element={<Outlet />}>
                      <Route index element={<UsersList />} />
                      <Route path=":class_id" element={<UsersList />} />

                      <Route path="add" element={<AddUser />} />
                      <Route path="update/:userId" element={<SingleUser />} />
                      <Route path="markbystudent/:_id" element={<MarksByStudent/>}/>
                    </Route>
                    <Route path="companies" element={<Outlet />}>
                      <Route index element={<SchoolList />} />
                      <Route path="add" element={<AddSchool />} />
                      <Route path=":school" element={<SingleClass />} />
                      <Route path="class/:school_id" element={<AddClass />} />
                    </Route>
                    <Route path="instructions" element={<Instructions />} />
                    {/* <Route path="settings"element={<Translation />}/> */}

                    <Route path="choose-school-and-class" element={<CurrentSchoolAndClass />} />
                  </Route>
               
                {/* <Route path="dash/actions" element={<LayoutActions />}> */}
                  <Route index element={<MainPage/>} />
                  <Route path="choose" element={<CurrentSchoolAndClass />} />
                  <Route path="personalldetails" element={<SingleUser notForATeacher="true" />} />
                  <Route path="tips" element={<Tips />} />
                 
                
                  <Route path="student-instruction" element={<StudentInstructions/>}/>
                  <Route path="gramar-rules" element={<GrammarRules/>}/>
                  <Route path="gramar-rules/past-simple-rules" element={<PastSimpleRules/>}/>
                  <Route path="gramar-rules/future-simple-rules" element={<FutureSimpleRules/>}/>
                  <Route path="gramar-rules/verb-explanation" element={<VerbsExplanation/>}/>
                  <Route path="gramar-rules/verb-explanation" element={<VerbsExplanation/>}/>
                          <Route path="gramar-rules/verb-explanation/irregular-rules" element={<IrregularVerbs/>}/>
                  <Route path="gramar-rules/present-continuous-rules" element={<PresentContinuousRules/>}/>
                  <Route path="comments" element={<Comments />} />
                  <Route path="comments/:title/:test_id" element={<Comments />} />

                  <Route path="wordsList" element={<ListWord />} />
                  <Route path="play/:_id/wordgame" element={<WordsGame />} />
                  <Route path="play/:_id/memory" element={<MemoryGame />} />
                  <Route path="play/:_id/multi-choice" element={<MultiChoiceGame />} />
                  <Route path="play/:_id/hangman" element={<HangmanGame />} />
                  {/* <Route path="play/puzzle/:_id" element={<PuzzleGame />} /> */}
                  <Route path="wordsList/marks/:wordlist_id/comments/:title/:test_id/:userId" element={<Comments />} />
                  <Route path="add-test" element={<AddWordsList />} />
                  <Route path="todos" element={<Todos />} />
                  <Route path="play/:_id" element={<Play/>}/>
                  <Route path="play" element={<Play/>}/>
                  <Route path="graphs" element={<MainGraphs/>}/>
                  <Route path="wordsList/marks/:_id" element={<ListMarkStudents />} />

                  <Route path="words/:_id" element={<Words />} />
                  <Route path=":_id" element={<SingleListWord />} />
                  <Route path="test/:trying/:_id" element={<Test />} />
                </Route>
              {/* </Route> */}
              </Route>
            </Route>
          </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
