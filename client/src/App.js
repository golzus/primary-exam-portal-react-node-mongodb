import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SiteLayout from "./components/layout/site/SiteLayout";
import DashLayout from "./components/layout/dash/DashLayout";
import SchoolList from "./features/companies/list/SchoolList";
import AddSchool from "./features/companies/add/AddSchool";
import UsersList from "./features/users/list/UsersList";
import AddUser from "./features/users/add/AddUser";
import SingleUser from "./features/users/view/SingleUser";
import LoginPage from "./features/auth/login/LoginPage";
import RequireAuth from "./features/auth/login/RequireAuth";
import LayoutActions from "./components/actions/layout/LayoutActions";
import ListWord from "./features/actions/listWord/list/ListWord";
import AddWordsList from "./features/actions/listWord/add/AddWordsList";
import SingleListWord from "./features/actions/listWord/view/SingleListWord";
import AddClass from "./features/companies/addClass/AddClass";
import Students from "./features/companies/students/Students";
import SingleClass from "./features/companies/view/SingleClass";
import AudioRecorder from "./features/actions/listWord/add/AudioRecorder";
import CurrentSchoolAndClass from "./features/companies/CurrentSchoolAndClass/CurrentSchoolAndClass";
import WordSpeaker from "./features/actions/listWord/add/WordSpeaker";
import Test from "./features/actions/listWord/test/Test";
import ExaminerPage from "./features/actions/listWord/list/ExaminerPage";
import Translation from "./features/actions/translate/Translation";
import TextToSpeechComponent from "./features/actions/listWord/add/TextToSpeechComponent";
import PersistLogin from "./features/auth/PersistLogin";
import Site from "./features/site/Site";
import Logo from "./features/logo/Logo";
import Web from "./features/web/Web";
import Todos from "./features/actions/todos/Todos";
import WelcomePage from "./WelcomePage";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={    <WelcomePage />
} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<PersistLogin />} >

          <Route element={<RequireAuth allowRoles={["Teacher", "Student"]} />}>
            <Route path="/dash" element={<DashLayout />}>
              {/* <Route index element={<Audio/>} /> */}
              <Route element={<RequireAuth allowRoles={["Teacher"]} />}>
                <Route path="dash/choose" element={<CurrentSchoolAndClass />} />
                <Route path="users" element={<Outlet />}>
                  <Route index element={<UsersList />} />

                  <Route path="add" element={<AddUser />} />
                  <Route path=":userId" element={<SingleUser />} />
                </Route>
                <Route path="companies" element={<Outlet />}>
                  <Route index element={<SchoolList />} />
                  <Route path="add" element={<AddSchool />} />
                  <Route path=":school" element={<SingleClass />} />
                  <Route path="aa" element={<Students />} />
                  <Route path="class" element={<AddClass />} />
                </Route>
                <Route path="settings" element={<AudioRecorder />} />
                {/* <Route path="settings"element={<Translation />}/> */}

                <Route path="help" element={<CurrentSchoolAndClass />} />
              </Route>
            </Route>
            <Route path="dash/actions" element={<LayoutActions />}>
              <Route index element={<h1> actions</h1>} />
              <Route path="choose" element={<CurrentSchoolAndClass />} />

              <Route path="wordLsList" element={<ListWord />} />
              <Route path="add" element={<AddWordsList />} />
              <Route path="todos" element={<Todos />} />

              <Route path=":_id" element={<SingleListWord />} />
              <Route path="test/:_id" element={<Test />} />
            </Route>
          </Route>
        </Route>

        </Route >
      </Routes>
    </Router>
  );
}

export default App;
