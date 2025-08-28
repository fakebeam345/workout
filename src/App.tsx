import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WorkoutModes from "./pages/WorkoutModes";
import RecordWorkout from "./pages/RecordWorkout";
import Calculator from "./pages/Calculator";
import Profile from "./pages/Profile";
import Nutrition from "./pages/Nutrition";
import ExerciseGuide from "./pages/ExerciseGuide";
import WorkoutSchedule from "./pages/WorkoutSchedule";
import Cardio from "./pages/Cardio";
import Yoga from "./pages/Yoga";
import Bodybuilding from "./pages/Bodybuilding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-modes" element={<WorkoutModes />} />
          <Route path="/record-workout" element={<RecordWorkout />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/exercise-guide" element={<ExerciseGuide />} />
          <Route path="/workout-schedule" element={<WorkoutSchedule />} />
          <Route path="/cardio" element={<Cardio />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/bodybuilding" element={<Bodybuilding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
