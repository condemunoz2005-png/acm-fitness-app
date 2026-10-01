import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, Users, Calendar, TrendingUp, Settings, LogOut, CheckCircle2, 
  Circle, Plus, Trash2, Edit3, Eye, Search, Filter, Play, Check, ChevronRight, 
  ArrowLeft, Clock, Flame, Award, HeartPulse, User, ShieldAlert, ArrowUpRight, 
  Copy, RefreshCw, X, MessageSquare, AlertCircle, Info, Sparkles, ChevronDown, 
  Video, BarChart3, Activity, Target, Smartphone, ChevronLeft, Lock, Mail, Phone,
  CalendarCheck, AlertTriangle
} from 'lucide-react';

const COACH_CREDENTIALS = {
  email: 'admin@acmfitness.com',
  password: 'ACMfitness05',
  role: 'admin',
  name: 'Entrenador ACM Fitness',
  specialty: 'Director Deportivo & Entrenador Personal',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

const DEFAULT_CLIENTS = [
  {
    id: 'client_1',
    role: 'client',
    name: 'Elena',
    lastName: 'Gómez Martín',
    email: 'elena@gmail.com',
    password: 'password123',
    phone: '+34 612 345 678',
    birthDate: '1995-04-12',
    gender: 'Femenino',
    weight: 62.5,
    height: 168,
    discipline: 'Fuerza & Acondicionamiento',
    level: 'Intermedio',
    mainGoal: 'Pérdida de grasa y tonificación',
    secondaryGoals: 'Mejorar resistencia cardiovascular y movilidad de cadera',
    experience: '2 años entrenando con regularidad',
    availabilityDays: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'],
    preferredTime: 'Mañanas (08:00 - 10:00)',
    workoutsPerWeek: 4,
    injuries: 'Sobrecarga leve en tendón rotuliano izquierdo',
    limitations: 'Evitar impacto brusco sin calentamiento articular exhaustivo',
    equipment: 'Gimnasio comercial completo',
    location: 'Gimnasio Municipal / Sala Fitness',
    status: 'Activo',
    joinedDate: '2025-01-10',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    metricsHistory: [
      { date: '2025-01-10', weight: 65.0, bodyFat: 24.5, benchPress: 40, squat: 65 },
      { date: '2025-02-10', weight: 63.8, bodyFat: 23.0, benchPress: 42.5, squat: 70 },
      { date: '2025-03-10', weight: 62.5, bodyFat: 21.8, benchPress: 45, squat: 75 },
    ]
  },
  {
    id: 'client_2',
    role: 'client',
    name: 'Mateo',
    lastName: 'Ruiz Delgado',
    email: 'mateo@gmail.com',
    password: 'password123',
    phone: '+34 689 901 234',
    birthDate: '1989-11-23',
    gender: 'Masculino',
    weight: 81.2,
    height: 182,
    discipline: 'Hipertrofia Muscular',
    level: 'Avanzado',
    mainGoal: 'Ganancia de masa muscular limpia',
    secondaryGoals: 'Mejorar marcas en movimientos básicos',
    experience: '5 años entrenando con cargas pesadas',
    availabilityDays: ['Lunes', 'Martes', 'Jueves', 'Viernes', 'Sábado'],
    preferredTime: 'Tardes (18:30 - 20:30)',
    workoutsPerWeek: 5,
    injuries: 'Molestias ocasionales en hombro derecho',
    limitations: 'Calentar manguito rotador con bandas antes de empujes',
    equipment: 'Gimnasio comercial',
    location: 'Centro de Alto Rendimiento ACM',
    status: 'Activo',
    joinedDate: '2024-11-05',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    metricsHistory: [
      { date: '2024-11-05', weight: 78.0, bodyFat: 14.0, benchPress: 90, squat: 110 },
      { date: '2025-01-15', weight: 80.0, bodyFat: 14.5, benchPress: 97.5, squat: 120 },
      { date: '2025-03-01', weight: 81.2, bodyFat: 13.8, benchPress: 105, squat: 130 },
    ]
  }
];

const DEFAULT_WORKOUTS = [
  {
    id: 'wk_1',
    clientId: 'client_1',
    title: 'Fuerza Tren Inferior & Estabilidad Lumbar',
    date: '2026-10-02',
    duration: 60,
    sessionGoal: 'Desarrollo de cuádriceps y glúteos con énfasis en control excéntrico',
    warmup: '10 min movilidad de tobillo y cadera + activación de glúteo medio con banda elástica',
    cooldown: 'Estiramiento dinámico de psoas, isquiotibiales y 5 min de descompresión espinal',
    coachNotes: 'Vigila que la rodilla izquierda no colapse en la sentadilla búlgara.',
    status: 'Pendiente',
    feedback: null,
    rating: null,
    exercises: [
      {
        id: 'ex_1',
        name: 'Sentadilla Goblet con Mancuerna',
        sets: 4,
        reps: '10-12',
        weight: '18 kg',
        rpe: '8',
        rest: '90s',
        tempo: '3-0-1-0',
        instructions: 'Pies a la anchura de hombros, torso erguido. Controla la bajada en 3 segundos.',
        videoUrl: 'https://youtube.com',
        notes: 'Colocar alzas en talones si notas limitación de dorsiflexión.',
        completed: false
      },
      {
        id: 'ex_2',
        name: 'Prensa Inclinada Unilateral',
        sets: 3,
        reps: '12 cada pierna',
        weight: '40 kg',
        rpe: '8',
        rest: '75s',
        tempo: '2-1-1-0',
        instructions: 'Apoyo firme del pie en el centro de la placa. Rango sin dolor en rótula.',
        videoUrl: '',
        notes: 'Pierna izquierda sin forzar el rebote en el punto más profundo.',
        completed: false
      },
      {
        id: 'ex_3',
        name: 'Hip Thrust con Barra Guiada',
        sets: 4,
        reps: '10',
        weight: '65 kg',
        rpe: '8.5',
        rest: '120s',
        tempo: '2-0-1-2',
        instructions: 'Pausa de 2 segundos de contracción máxima isométrica arriba.',
        videoUrl: '',
        notes: 'Mirada al frente en todo momento para proteger la zona lumbar.',
        completed: false
      }
    ]
  },
  {
    id: 'wk_2',
    clientId: 'client_2',
    title: 'Torso Empuje & Densidad Pectoral',
    date: '2026-10-01',
    duration: 75,
    sessionGoal: 'Sobrecarga progresiva en press plano con barra y trabajo accesorio de tríceps',
    warmup: 'Protocolo YTWL con elásticos + series de aproximación en banca',
    cooldown: 'Estiramiento suave de pectoral menor y rotación torácica',
    coachNotes: 'Respeta los 2 minutos y medio de descanso en las series principales de press.',
    status: 'Pendiente',
    feedback: null,
    rating: null,
    exercises: [
      {
        id: 'ex_4',
        name: 'Press de Banca Plano con Barra Olímpica',
        sets: 4,
        reps: '6-8',
        weight: '102.5 kg',
        rpe: '8.5',
        rest: '150s',
        tempo: '3-1-X-0',
        instructions: 'Pausa controlada de 1 segundo en el pecho y empuje explosivo.',
        videoUrl: '',
        notes: 'Mantén los omóplatos bien retraídos y deprimidos contra el banco.',
        completed: false
      },
      {
        id: 'ex_5',
        name: 'Fondos en Paralelas Lastrados',
        sets: 3,
        reps: '10',
        weight: '+15 kg',
        rpe: '8',
        rest: '90s',
        tempo: '2-0-1-0',
        instructions: 'Inclinación de 15 grados para mayor énfasis en pectoral inferior.',
        videoUrl: '',
        notes: '',
        completed: false
      }
    ]
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('acm_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('acm_clients');
      return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
    } catch {
      return DEFAULT_CLIENTS;
    }
  });

  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = localStorage.getItem('acm_workouts');
      return saved ? JSON.parse(saved) : DEFAULT_WORKOUTS;
    } catch {
      return DEFAULT_WORKOUTS;
    }
  });

  const [currentView, setCurrentView] = useState('landing');
  const [coachActiveTab, setCoachActiveTab] = useState('dashboard');
  const [clientActiveTab, setClientActiveTab] = useState('home');

  // Modals & Safety Dialogs
  const [selectedClientForView, setSelectedClientForView] = useState(null);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [activeWorkoutSession, setActiveWorkoutSession] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync state to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('acm_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('acm_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('acm_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('acm_workouts', JSON.stringify(workouts));
  }, [workouts]);

  // Strict role routing
  useEffect(() => {
    if (!currentUser) {
      if (currentView !== 'login' && currentView !== 'register') {
        setCurrentView('landing');
      }
    } else {
      if (currentUser.role === 'admin') {
        setCurrentView('coach_panel');
      } else {
        setCurrentView('client_panel');
      }
    }
  }, [currentUser]);

  const handleLogin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Strict verification for Coach Master Account
    if (cleanEmail === COACH_CREDENTIALS.email.toLowerCase()) {
      if (password === COACH_CREDENTIALS.password) {
        setCurrentUser(COACH_CREDENTIALS);
        showToast('Bienvenido, Entrenador ACM Fitness.');
        return { success: true };
      } else {
        return { success: false, message: 'Contraseña de entrenador incorrecta.' };
      }
    }

    // Client verification
    const foundClient = clients.find(c => c.email.toLowerCase() === cleanEmail);
    if (foundClient) {
      if (foundClient.password === password) {
        setCurrentUser(foundClient);
        showToast(`Bienvenido/a de nuevo, ${foundClient.name}.`);
        return { success: true };
      } else {
        return { success: false, message: 'La contraseña introducida es incorrecta.' };
      }
    }

    return { 
      success: false, 
      message: 'No existe ninguna cuenta asociada a este correo electrónico.' 
    };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    setSelectedClientForView(null);
    setActiveWorkoutSession(null);
    showToast('Has cerrado sesión correctamente.', 'info');
  };

  const handleRegisterClient = (newClientData) => {
    const existing = clients.find(c => c.email.toLowerCase() === newClientData.email.toLowerCase());
    if (existing || newClientData.email.toLowerCase() === COACH_CREDENTIALS.email.toLowerCase()) {
      return { success: false, message: 'Este correo ya se encuentra registrado en el sistema.' };
    }

    const newId = `client_${Date.now()}`;
    const fullClient = {
      ...newClientData,
      id: newId,
      role: 'client',
      status: 'Activo',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      metricsHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          weight: parseFloat(newClientData.weight) || 70,
          bodyFat: 20,
          benchPress: 0,
          squat: 0
        }
      ]
    };

    setClients(prev => [fullClient, ...prev]);
    setCurrentUser(fullClient);
    showToast('Ficha creada con éxito. Bienvenido/a a ACM Fitness.');
    return { success: true };
  };

  // Secure deletion of a client
  const handleConfirmDeleteClient = () => {
    if (!clientToDelete) return;
    const clientId = clientToDelete.id;
    const clientName = clientToDelete.name;

    // Delete client and cascade delete workouts
    setClients(prev => prev.filter(c => c.id !== clientId));
    setWorkouts(prev => prev.filter(w => w.clientId !== clientId));

    if (selectedClientForView?.id === clientId) {
      setSelectedClientForView(null);
    }

    setClientToDelete(null);
    showToast(`El cliente ${clientName} y sus entrenamientos han sido eliminados.`, 'error');
  };

  const handleSaveWorkout = (workoutData) => {
    if (workoutData.id) {
      setWorkouts(prev => prev.map(w => w.id === workoutData.id ? workoutData : w));
      showToast('Entrenamiento actualizado correctamente.');
    } else {
      const newWk = {
        ...workoutData,
        id: `wk_${Date.now()}`,
        status: workoutData.status || 'Pendiente',
        feedback: null,
        rating: null
      };
      setWorkouts(prev => [newWk, ...prev]);
      showToast('Nuevo entrenamiento asignado con éxito.');
    }
    setIsWorkoutModalOpen(false);
    setEditingWorkout(null);
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
    showToast('Entrenamiento eliminado del sistema.', 'info');
  };

  const handleDuplicateWorkout = (workout) => {
    const duplicated = {
      ...workout,
      id: `wk_${Date.now()}`,
      title: `${workout.title} (Copia)`,
      status: 'Pendiente',
      feedback: null,
      rating: null,
      exercises: workout.exercises.map(ex => ({ ...ex, completed: false }))
    };
    setWorkouts(prev => [duplicated, ...prev]);
    showToast('Entrenamiento duplicado correctamente.');
  };

  const handleFinishClientWorkout = (workoutId, updatedExercises, feedbackText, ratingScore) => {
    setWorkouts(prev => prev.map(wk => {
      if (wk.id === workoutId) {
        return {
          ...wk,
          status: 'Completado',
          exercises: updatedExercises,
          feedback: feedbackText,
          rating: ratingScore,
          completedAt: new Date().toISOString()
        };
      }
      return wk;
    }));
    setActiveWorkoutSession(null);
    showToast('¡Entrenamiento completado! Tu feedback ha sido enviado al entrenador.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl animate-fade-in text-xs font-bold text-white">
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : toastMessage.type === 'info' ? (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {currentView === 'landing' && (
        <LandingPage 
          onOpenLogin={() => setCurrentView('login')} 
          onOpenRegister={() => setCurrentView('register')}
        />
      )}

      {currentView === 'login' && (
        <LoginView 
          onBack={() => setCurrentView('landing')} 
          onLogin={handleLogin}
          onGoRegister={() => setCurrentView('register')}
        />
      )}

      {currentView === 'register' && (
        <RegisterView 
          onBack={() => setCurrentView('landing')}
          onRegister={handleRegisterClient}
          onGoLogin={() => setCurrentView('login')}
        />
      )}

      {/* Strict Access Guard: Only admin can see Coach Panel */}
      {currentView === 'coach_panel' && currentUser?.role === 'admin' && (
        <CoachDashboardLayout
          coach={currentUser}
          activeTab={coachActiveTab}
          setActiveTab={setCoachActiveTab}
          clients={clients}
          workouts={workouts}
          onLogout={handleLogout}
          onOpenWorkoutCreator={(wk) => {
            setEditingWorkout(wk || null);
            setIsWorkoutModalOpen(true);
          }}
          onSelectClientForDetail={(client) => setSelectedClientForView(client)}
          onDeleteWorkout={handleDeleteWorkout}
          onDuplicateWorkout={handleDuplicateWorkout}
          onRequestDeleteClient={(client) => setClientToDelete(client)}
        />
      )}

      {/* Strict Access Guard: Clients only view their personal panel */}
      {currentView === 'client_panel' && currentUser?.role === 'client' && (
        <ClientDashboardLayout 
          client={currentUser}
          activeTab={clientActiveTab}
          setActiveTab={setClientActiveTab}
          workouts={workouts.filter(w => w.clientId === currentUser.id)}
          onLogout={handleLogout}
          onStartWorkout={(wk) => setActiveWorkoutSession(wk)}
          onUpdateClientProfile={(updatedClient) => {
            setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
            setCurrentUser(updatedClient);
            showToast('Tus datos han sido actualizados con éxito.');
          }}
        />
      )}

      {/* MODAL: Client Detailed Dossier for Coach */}
      {selectedClientForView && (
        <ClientDetailModal 
          client={selectedClientForView}
          workouts={workouts.filter(w => w.clientId === selectedClientForView.id)}
          onClose={() => setSelectedClientForView(null)}
          onCreateWorkoutForClient={() => {
            setEditingWorkout({ clientId: selectedClientForView.id });
            setIsWorkoutModalOpen(true);
          }}
          onDeleteClient={() => {
            const client = selectedClientForView;
            setSelectedClientForView(null);
            setClientToDelete(client);
          }}
          onUpdateMetrics={(newMetric) => {
            const updated = {
              ...selectedClientForView,
              weight: newMetric.weight || selectedClientForView.weight,
              metricsHistory: [...(selectedClientForView.metricsHistory || []), newMetric]
            };
            setClients(prev => prev.map(c => c.id === updated.id ? updated : c));
            setSelectedClientForView(updated);
            showToast('Métrica registrada correctamente.');
          }}
        />
      )}

      {/* MODAL: Custom Workout Builder */}
      {isWorkoutModalOpen && (
        <WorkoutEditorModal 
          isOpen={isWorkoutModalOpen}
          initialWorkout={editingWorkout}
          clients={clients}
          onClose={() => {
            setIsWorkoutModalOpen(false);
            setEditingWorkout(null);
          }}
          onSave={handleSaveWorkout}
        />
      )}

      {/* MODAL: Interactive Client Live Workout Session */}
      {activeWorkoutSession && (
        <ActiveWorkoutExecutionModal 
          workout={activeWorkoutSession}
          onClose={() => setActiveWorkoutSession(null)}
          onFinish={handleFinishClientWorkout}
        />
      )}

      {/* MODAL: Safety Confirmation to Delete Client */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-white">¿Eliminar cliente?</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Estás a punto de eliminar permanentemente a <span className="text-white font-bold">{clientToDelete.name} {clientToDelete.lastName || ''}</span> ({clientToDelete.email}). Se borrarán todos sus registros físicos, historial y entrenamientos asociados. Esta acción no se puede deshacer.
            </p>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmDeleteClient}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold text-white transition flex items-center gap-2 shadow-lg shadow-red-500/20"
              >
                <Trash2 className="w-4 h-4" /> Sí, eliminar cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LandingPage({ onOpenLogin, onOpenRegister }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">ACM<span className="text-emerald-400">FITNESS</span></span>
              <span className="block text-[10px] tracking-widest text-slate-400 uppercase font-semibold">Entrenamiento Personal & Rendimiento</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={onOpenLogin}
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition rounded-xl hover:bg-slate-800"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={onOpenRegister}
              className="text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 transition transform active:scale-95"
            >
              Registrarme
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-8">
              <Flame className="w-4 h-4" /> Centro Oficial de Preparación Física & Salud
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
              Entrenamiento de Élite. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Control Total y Resultados Reales.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Plataforma profesional para la gestión deportiva individualizada. Rutinas a medida con parámetros de carga, descanso interactivo, control de lesiones y seguimiento continuo.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Comenzar Registro de Atleta <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-2xl border border-slate-800 transition flex items-center justify-center gap-2"
              >
                Área Privada de Acceso <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              </button>
            </div>

            {/* Metric counters */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl">
                <p className="text-3xl font-black text-white">1 a 1</p>
                <p className="text-xs uppercase text-slate-400 font-bold mt-1">Atención Personalizada</p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl">
                <p className="text-3xl font-black text-emerald-400">RPE & Tempo</p>
                <p className="text-xs uppercase text-slate-400 font-bold mt-1">Prescripción Científica</p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl">
                <p className="text-3xl font-black text-white">RGPD</p>
                <p className="text-xs uppercase text-slate-400 font-bold mt-1">Datos Médicos Protegidos</p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl">
                <p className="text-3xl font-black text-emerald-400">Mobile</p>
                <p className="text-xs uppercase text-slate-400 font-bold mt-1">Seguimiento en Sala</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-slate-900/40 border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-xs font-black uppercase tracking-widest text-emerald-400">Beneficios de Trabajar con ACM Fitness</h2>
              <p className="text-3xl sm:text-4xl font-black text-white mt-2">La excelencia aplicada a tu progreso físico</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Prevención y Readaptación</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Evaluación estricta de patologías, limitaciones articulares y molestias para garantizar una práctica segura sin lesiones.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Entrenamientos Interactivos</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Lleva tu móvil a la sala de entrenamiento, cronometra tus descansos, marca series completadas y envía tus sensaciones al finalizar.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Evolución Cuantificada</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Registro de pesajes periódicos, marcas en ejercicios principales y retroalimentación constante del entrenador.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© 2026 ACM FITNESS - Plataforma Deportiva Profesional.</p>
        <p className="mt-1">Todos los derechos reservados. Diseñado para alto rendimiento.</p>
      </footer>
    </div>
  );
}

function LoginView({ onBack, onLogin, onGoRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = onLogin(email, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" /> Inicio
        </button>

        <div className="text-center mt-6 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Acceso a ACM Fitness</h2>
          <p className="text-xs text-slate-400 mt-1">Introduce tu correo y contraseña para acceder a tu área</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com o admin@acmfitness.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/20 text-xs sm:text-sm"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-800/80 pt-6">
          <p className="text-xs text-slate-400">
            ¿Eres un nuevo cliente?{' '}
            <button onClick={onGoRegister} className="text-emerald-400 font-bold hover:underline">
              Registrar mi ficha deportiva
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function RegisterView({ onBack, onRegister, onGoLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    gender: 'Masculino',
    weight: '',
    height: '',
    discipline: 'Fuerza & Acondicionamiento',
    level: 'Principiante',
    mainGoal: '',
    secondaryGoals: '',
    experience: '',
    availabilityDays: ['Lunes', 'Miércoles', 'Viernes'],
    preferredTime: 'Tardes',
    workoutsPerWeek: 3,
    injuries: '',
    limitations: '',
    observations: '',
    equipment: 'Gimnasio comercial completo',
    location: '',
    consentData: false,
    consentTraining: false
  });

  const [formStep, setFormStep] = useState(1);
  const [error, setError] = useState('');

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availabilityDays: prev.availabilityDays.includes(day)
        ? prev.availabilityDays.filter(d => d !== day)
        : [...prev.availabilityDays, day]
    }));
  };

  const handleNext = () => {
    if (formStep === 1) {
      if (!formData.name || !formData.lastName || !formData.email || !formData.password) {
        setError('Por favor completa todos los campos obligatorios del paso 1.');
        return;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
    }
    setError('');
    setFormStep(prev => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consentData || !formData.consentTraining) {
      setError('Debes aceptar las casillas de consentimiento legal y médico para continuar.');
      return;
    }
    const res = onRegister(formData);
    if (!res.success) {
      setError(res.message);
    }
  };

  const daysList = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-950 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-semibold mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Cancelar y volver
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-black text-white">Registro de Nuevo Atleta</h1>
            <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              Paso {formStep} de 3
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Formulario inicial para que el entrenador pueda programar tu plan de entrenamiento individualizado.
          </p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${(formStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Datos Personales & Físicos */}
          {formStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. Datos Personales y Antropométricos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Nombre *</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Ej. Manuel"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Apellidos *</label>
                  <input 
                    type="text" required
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Ej. García López"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Email (Usuario de acceso) *</label>
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="manuel@gmail.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Contraseña de Acceso *</label>
                  <input 
                    type="password" required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Teléfono</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="+34 600 000 000"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Fecha de Nacimiento</label>
                  <input 
                    type="date"
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Sexo</label>
                  <select 
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-300">Peso actual (kg)</label>
                  <input 
                    type="number" step="0.1"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Ej. 74.5"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Altura (cm)</label>
                  <input 
                    type="number"
                    value={formData.height}
                    onChange={e => setFormData({ ...formData, height: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Ej. 178"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-xs sm:text-sm"
                >
                  Siguiente: Datos Deportivos <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Datos Deportivos */}
          {formStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. Datos Deportivos y Objetivos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Deporte o Disciplina</label>
                  <input 
                    type="text"
                    value={formData.discipline}
                    onChange={e => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Fuerza, Gimnasio, Oposiciones, Running..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Nivel en el deporte</label>
                  <select 
                    value={formData.level}
                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Objetivo Principal *</label>
                <input 
                  type="text" required
                  value={formData.mainGoal}
                  onChange={e => setFormData({ ...formData, mainGoal: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  placeholder="Ej. Pérdida de 5kg de grasa corporal y ganar fuerza"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Objetivos Secundarios</label>
                <input 
                  type="text"
                  value={formData.secondaryGoals}
                  onChange={e => setFormData({ ...formData, secondaryGoals: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  placeholder="Ej. Reducir dolor lumbar y mejorar postura en la oficina"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Nº de Entrenamientos por Semana</label>
                  <input 
                    type="number" min="1" max="7"
                    value={formData.workoutsPerWeek}
                    onChange={e => setFormData({ ...formData, workoutsPerWeek: parseInt(e.target.value) || 3 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Horario Preferente</label>
                  <input 
                    type="text"
                    value={formData.preferredTime}
                    onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Ej. 19:00 a 20:30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-2 block">Días Disponibles para Entrenar</label>
                <div className="flex flex-wrap gap-2">
                  {daysList.map(d => {
                    const isSelected = formData.availabilityDays.includes(d);
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => toggleDay(d)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${
                          isSelected 
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setFormStep(1)}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition text-xs sm:text-sm"
                >
                  Atrás
                </button>
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-xs sm:text-sm"
                >
                  Siguiente: Salud & RGPD <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Lesiones, Material y Consentimiento */}
          {formStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. Información Médica, Material y Consentimiento</h3>

              <div>
                <label className="text-xs font-bold text-slate-300">Lesiones Actuales o Anteriores</label>
                <textarea 
                  rows="2"
                  value={formData.injuries}
                  onChange={e => setFormData({ ...formData, injuries: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  placeholder="Detalla lesiones óseas, tendinosas o intervenciones quirúrgicas..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Limitaciones Físicas</label>
                <textarea 
                  rows="2"
                  value={formData.limitations}
                  onChange={e => setFormData({ ...formData, limitations: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                  placeholder="Molestias en ejercicios específicos, mareos, asma..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Equipamiento Disponible</label>
                  <input 
                    type="text"
                    value={formData.equipment}
                    onChange={e => setFormData({ ...formData, equipment: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Gimnasio comercial, Mancuernas en casa..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Lugar Habitual de Entrenamiento</label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none mt-1"
                    placeholder="Gimnasio / En casa / Parque"
                  />
                </div>
              </div>

              {/* Consent check boxes */}
              <div className="pt-3 space-y-3 border-t border-slate-800">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" required
                    checked={formData.consentData}
                    onChange={e => setFormData({ ...formData, consentData: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700"
                  />
                  <span className="text-xs text-slate-400 leading-snug">
                    Doy mi consentimiento para el tratamiento de mis datos personales y de salud para la gestión deportiva y la planificación de mis entrenamientos en ACM Fitness de acuerdo con el RGPD.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" required
                    checked={formData.consentTraining}
                    onChange={e => setFormData({ ...formData, consentTraining: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-950 border-slate-700"
                  />
                  <span className="text-xs text-slate-400 leading-snug">
                    Declaro que no tengo contraindicaciones médicas para la práctica de actividad física y me comprometo a comunicar cualquier molestia durante los ejercicios.
                  </span>
                </label>
              </div>

              <div className="pt-6 flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setFormStep(2)}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition text-xs sm:text-sm"
                >
                  Atrás
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition shadow-xl shadow-emerald-500/25 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Check className="w-5 h-5 stroke-[2.5]" /> Crear Cuenta y Acceder
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 text-center border-t border-slate-800/80 pt-4">
          <p className="text-xs text-slate-400">
            ¿Ya tienes una cuenta registrada?{' '}
            <button onClick={onGoLogin} className="text-emerald-400 font-bold hover:underline">
              Iniciar Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function CoachDashboardLayout({ 
  coach, activeTab, setActiveTab, clients, workouts, onLogout, 
  onOpenWorkoutCreator, onSelectClientForDetail, onDeleteWorkout, onDuplicateWorkout, onRequestDeleteClient 
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar for Coach */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo brand */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-lg text-white">ACM<span className="text-emerald-400">FITNESS</span></span>
                <span className="block text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Panel Entrenador</span>
              </div>
            </div>
          </div>

          {/* Coach Profile Card */}
          <div className="p-4 mx-4 my-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              ACM
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{coach.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{coach.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1.5 mt-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'clients', label: 'Clientes', icon: Users, badge: clients.length },
              { id: 'workouts', label: 'Entrenamientos', icon: Dumbbell, badge: workouts.length },
              { id: 'calendar', label: 'Planificación', icon: Calendar },
              { id: 'progress', label: 'Progreso', icon: TrendingUp },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => onOpenWorkoutCreator()}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Crear Entrenamiento
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-8 lg:p-10">
        {activeTab === 'dashboard' && (
          <CoachOverviewTab 
            clients={clients} 
            workouts={workouts} 
            onSelectClient={onSelectClientForDetail}
            onOpenWorkoutCreator={onOpenWorkoutCreator}
          />
        )}

        {activeTab === 'clients' && (
          <CoachClientsListTab 
            clients={clients} 
            workouts={workouts} 
            onSelectClient={onSelectClientForDetail}
            onRequestDeleteClient={onRequestDeleteClient}
          />
        )}

        {activeTab === 'workouts' && (
          <CoachWorkoutsTab 
            workouts={workouts} 
            clients={clients} 
            onOpenCreator={onOpenWorkoutCreator}
            onDelete={onDeleteWorkout}
            onDuplicate={onDuplicateWorkout}
          />
        )}

        {activeTab === 'calendar' && (
          <CoachCalendarTab 
            workouts={workouts} 
            clients={clients} 
            onOpenCreator={onOpenWorkoutCreator}
          />
        )}

        {activeTab === 'progress' && (
          <CoachProgressOverviewTab 
            clients={clients} 
            onSelectClient={onSelectClientForDetail}
          />
        )}
      </main>
    </div>
  );
}

function CoachOverviewTab({ clients, workouts, onSelectClient, onOpenWorkoutCreator }) {
  const activeCount = clients.filter(c => c.status === 'Activo').length;
  const completedCount = workouts.filter(w => w.status === 'Completado').length;
  const pendingCount = workouts.filter(w => w.status === 'Pendiente').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Panel de Control General</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Supervisión deportiva de tus clientes y estado de sesiones en ACM Fitness.</p>
        </div>
        <button 
          onClick={() => onOpenWorkoutCreator()}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Asignar Nueva Sesión
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Clientes</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{clients.length}</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">Registrados en la plataforma</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Clientes Activos</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400 mt-3">{activeCount}</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-1">Con plan vigente</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Entrenos Completados</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{completedCount}</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">Con feedback recibido</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Entrenos Pendientes</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 mt-3">{pendingCount}</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-1">Por completar por atletas</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Clients & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Últimos Clientes Registrados
            </h2>
            <span className="text-xs text-slate-400 font-semibold">{clients.length} totales</span>
          </div>

          <div className="space-y-3">
            {clients.slice(0, 5).map(client => {
              const clientWks = workouts.filter(w => w.clientId === client.id);
              return (
                <div 
                  key={client.id}
                  onClick={() => onSelectClient(client)}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 flex items-center justify-between cursor-pointer transition"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img 
                      src={client.avatar} 
                      alt={client.name} 
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{client.name} {client.lastName || ''}</p>
                      <p className="text-[11px] text-slate-400 truncate">{client.mainGoal}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {clientWks.length} entrenos
                    </span>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-1">{client.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Feedback de Sesiones
            </h2>
            <span className="text-xs text-slate-400 font-semibold">Comentarios de clientes</span>
          </div>

          <div className="space-y-3">
            {workouts.filter(w => w.feedback).length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">Aún no hay feedback registrado por los clientes.</p>
            ) : (
              workouts.filter(w => w.feedback).slice(0, 4).map(wk => {
                const client = clients.find(c => c.id === wk.clientId);
                return (
                  <div key={wk.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{client?.name || 'Cliente'}</span>
                        <span className="text-[10px] text-slate-400">• {wk.title}</span>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs">
                        {'★'.repeat(wk.rating || 5)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                      "{wk.feedback}"
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachClientsListTab({ clients, workouts, onSelectClient, onRequestDeleteClient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const fullName = `${c.name} ${c.lastName || ''}`.toLowerCase();
      const matchesSearch = 
        fullName.includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.mainGoal.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = levelFilter === 'ALL' || c.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [clients, searchTerm, levelFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Directorio de Clientes</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Listado completo, datos biomédicos y gestión de bajas.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, correo u objetivo..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <select 
            value={levelFilter}
            onChange={e => setLevelFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Todos los Niveles</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClients.map(client => {
          const clientWorkouts = workouts.filter(w => w.clientId === client.id);
          const completedCount = clientWorkouts.filter(w => w.status === 'Completado').length;

          return (
            <div 
              key={client.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={client.avatar} 
                      alt={client.name} 
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white">{client.name} {client.lastName || ''}</h3>
                      <p className="text-xs text-slate-400">{client.email}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    client.status === 'Activo' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {client.status}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Teléfono:</span>
                    <span className="text-white font-medium">{client.phone || 'No registrado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Objetivo:</span>
                    <span className="text-slate-200 font-semibold text-right max-w-[180px] truncate">{client.mainGoal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nivel / Deporte:</span>
                    <span className="text-emerald-400 font-semibold">{client.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peso / Altura:</span>
                    <span className="text-white font-semibold">{client.weight} kg • {client.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entrenamientos:</span>
                    <span className="text-white font-bold">{completedCount} / {clientWorkouts.length} hechos</span>
                  </div>
                </div>

                {client.injuries && (
                  <div className="mt-3 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="truncate">{client.injuries}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                <button 
                  onClick={() => onSelectClient(client)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Ver Ficha
                </button>
                <button 
                  onClick={() => onRequestDeleteClient(client)}
                  title="Eliminar cliente del sistema"
                  className="p-2.5 bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CoachWorkoutsTab({ workouts, clients, onOpenCreator, onDelete, onDuplicate }) {
  const [filterClient, setFilterClient] = useState('ALL');

  const filteredWorkouts = useMemo(() => {
    if (filterClient === 'ALL') return workouts;
    return workouts.filter(w => w.clientId === filterClient);
  }, [workouts, filterClient]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Gestor de Entrenamientos</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Crea, edita, duplica y asigna sesiones a tus atletas.</p>
        </div>
        <button 
          onClick={() => onOpenCreator()}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Crear Nuevo Entrenamiento
        </button>
      </div>

      {/* Filter by client */}
      <div className="max-w-xs">
        <select 
          value={filterClient}
          onChange={e => setFilterClient(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="ALL">Filtrar por Cliente: Todos</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name} {c.lastName || ''}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl">
            <Dumbbell className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-white">No hay entrenamientos para este criterio.</p>
            <p className="text-xs text-slate-400 mt-1">Crea una rutina personalizada para tu cliente.</p>
          </div>
        ) : (
          filteredWorkouts.map(wk => {
            const client = clients.find(c => c.id === wk.clientId);
            return (
              <div 
                key={wk.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{wk.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      wk.status === 'Completado' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {wk.status}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {wk.date}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {wk.duration} min
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400 font-semibold">
                    Cliente asignado: <span className="text-white font-bold">{client?.name} {client?.lastName || ''}</span>
                  </p>
                  <p className="text-xs text-slate-400">{wk.sessionGoal}</p>

                  <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-3">
                    <span>{wk.exercises?.length || 0} ejercicios</span>
                    {wk.coachNotes && <span className="italic truncate max-w-md">Nota: "{wk.coachNotes}"</span>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
                  <button 
                    onClick={() => onDuplicate(wk)}
                    title="Duplicar entrenamiento"
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onOpenCreator(wk)}
                    title="Editar entrenamiento"
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(wk.id)}
                    title="Eliminar entrenamiento"
                    className="p-2.5 bg-slate-800 hover:bg-red-500/20 rounded-xl text-slate-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function CoachCalendarTab({ workouts, clients, onOpenCreator }) {
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Planificación de Sesiones</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Distribución semanal de los entrenamientos de tus clientes.</p>
        </div>
        <button 
          onClick={() => onOpenCreator()}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Añadir al Calendario
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {daysOfWeek.map((dayName, index) => {
          return (
            <div key={dayName} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[220px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-black text-white uppercase tracking-wider">{dayName}</span>
                <span className="text-[10px] text-slate-500 font-bold">Día {index + 1}</span>
              </div>

              <div className="space-y-2 flex-1">
                {workouts.filter((_, i) => (i % 7) === index).length === 0 ? (
                  <p className="text-[11px] text-slate-600 italic py-4 text-center">Sin entrenos asignados</p>
                ) : (
                  workouts.filter((_, i) => (i % 7) === index).map(wk => {
                    const client = clients.find(c => c.id === wk.clientId);
                    return (
                      <div 
                        key={wk.id} 
                        onClick={() => onOpenCreator(wk)}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition text-left"
                      >
                        <p className="text-xs font-bold text-white truncate">{wk.title}</p>
                        <p className="text-[10px] text-emerald-400 font-semibold">{client?.name}</p>
                        <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                          <span>{wk.duration} min</span>
                          <span className={wk.status === 'Completado' ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                            {wk.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CoachProgressOverviewTab({ clients, onSelectClient }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Seguimiento Físico & Tests</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Registros antropométricos y marcas de fuerza de tus atletas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => {
          const history = client.metricsHistory || [];
          const initialWeight = history[0]?.weight || client.weight;
          const currentWeight = history[history.length - 1]?.weight || client.weight;
          const weightDiff = (currentWeight - initialWeight).toFixed(1);

          return (
            <div key={client.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{client.name} {client.lastName || ''}</h3>
                    <p className="text-[11px] text-slate-400">{client.mainGoal}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onSelectClient(client)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Metric stats */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Peso</p>
                  <p className="text-sm font-black text-white">{currentWeight} kg</p>
                  <span className="text-[10px] text-emerald-400">{weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Banca</p>
                  <p className="text-sm font-black text-emerald-400">{history[history.length - 1]?.benchPress || '-'} kg</p>
                  <span className="text-[10px] text-slate-500">1RM est.</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Sentadilla</p>
                  <p className="text-sm font-black text-teal-400">{history[history.length - 1]?.squat || '-'} kg</p>
                  <span className="text-[10px] text-slate-500">1RM est.</span>
                </div>
              </div>

              {/* Progress visual */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Evolución de Pesajes</p>
                <div className="flex items-end gap-2 h-16 pt-2">
                  {history.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div 
                        className="w-full bg-emerald-500/80 rounded-t-lg transition-all"
                        style={{ height: `${Math.min(100, Math.max(20, (m.weight / 100) * 100))}%` }}
                      />
                      <span className="text-[9px] text-slate-400 truncate">{m.date.slice(5)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onSelectClient(client)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-white transition"
              >
                Ver Ficha & Añadir Test
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClientDetailModal({ client, workouts, onClose, onCreateWorkoutForClient, onDeleteClient, onUpdateMetrics }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [newWeight, setNewWeight] = useState('');
  const [newBench, setNewBench] = useState('');
  const [newSquat, setNewSquat] = useState('');

  const handleAddMetric = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    onUpdateMetrics({
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
      benchPress: parseFloat(newBench) || 0,
      squat: parseFloat(newSquat) || 0
    });
    setNewWeight('');
    setNewBench('');
    setNewSquat('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <img src={client.avatar} alt={client.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/50" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{client.name} {client.lastName || ''}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {client.level}
                </span>
              </div>
              <p className="text-xs text-slate-400">{client.email} • {client.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onDeleteClient}
              className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 bg-slate-800 flex items-center gap-1.5 text-xs font-bold"
              title="Eliminar este cliente"
            >
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 px-6 gap-6 shrink-0 bg-slate-950/40 overflow-x-auto">
          {[
            { id: 'profile', label: 'Datos & Objetivos' },
            { id: 'medical', label: 'Salud & Lesiones' },
            { id: 'workouts', label: 'Entrenamientos' },
            { id: 'progress', label: 'Métricas & Tests' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`py-3 text-xs font-bold transition border-b-2 whitespace-nowrap ${
                activeTab === t.id 
                  ? 'border-emerald-400 text-emerald-400' 
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Información Deportiva</h4>
                <div className="text-xs space-y-2">
                  <p><span className="text-slate-400">Objetivo Principal:</span> <span className="text-white font-semibold">{client.mainGoal}</span></p>
                  <p><span className="text-slate-400">Objetivos Secundarios:</span> <span className="text-white font-semibold">{client.secondaryGoals || 'Ninguno'}</span></p>
                  <p><span className="text-slate-400">Disciplina:</span> <span className="text-white font-semibold">{client.discipline}</span></p>
                  <p><span className="text-slate-400">Experiencia previa:</span> <span className="text-white font-semibold">{client.experience || 'No indicada'}</span></p>
                  <p><span className="text-slate-400">Frecuencia semanal:</span> <span className="text-white font-semibold">{client.workoutsPerWeek} días</span></p>
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Disponibilidad & Logística</h4>
                <div className="text-xs space-y-2">
                  <p><span className="text-slate-400">Horario preferido:</span> <span className="text-white font-semibold">{client.preferredTime}</span></p>
                  <p><span className="text-slate-400">Lugar de entreno:</span> <span className="text-white font-semibold">{client.location || 'Gimnasio habitual'}</span></p>
                  <p><span className="text-slate-400">Equipamiento:</span> <span className="text-white font-semibold">{client.equipment}</span></p>
                  <div>
                    <span className="text-slate-400 block mb-1">Días disponibles:</span>
                    <div className="flex flex-wrap gap-1">
                      {client.availabilityDays?.map(d => (
                        <span key={d} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Lesiones Registradas
                </h4>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                  {client.injuries || 'El cliente no ha registrado lesiones previas ni patologías.'}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Limitaciones Técnicas y Articulares</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {client.limitations || 'Sin limitaciones específicas reportadas.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'workouts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Entrenamientos del Cliente</h4>
                <button 
                  onClick={() => {
                    onClose();
                    onCreateWorkoutForClient();
                  }}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
                >
                  + Asignar Rutina
                </button>
              </div>

              {workouts.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No hay sesiones creadas para este cliente todavía.</p>
              ) : (
                <div className="space-y-2">
                  {workouts.map(w => (
                    <div key={w.id} className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{w.title}</p>
                        <p className="text-[10px] text-slate-400">{w.date} • {w.exercises.length} ejercicios</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        w.status === 'Completado' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {w.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <form onSubmit={handleAddMetric} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Registrar Nuevo Control / Test</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Peso (kg) *</label>
                    <input 
                      type="number" step="0.1" required
                      placeholder="63.0"
                      value={newWeight}
                      onChange={e => setNewWeight(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Test Banca (kg)</label>
                    <input 
                      type="number" step="0.5"
                      placeholder="50"
                      value={newBench}
                      onChange={e => setNewBench(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Test Sentadilla (kg)</label>
                    <input 
                      type="number" step="0.5"
                      placeholder="80"
                      value={newSquat}
                      onChange={e => setNewSquat(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg">
                      Guardar Test
                    </button>
                  </div>
                </div>
              </form>

              <div className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Peso</th>
                      <th className="p-3">Press Banca</th>
                      <th className="p-3">Sentadilla</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {client.metricsHistory?.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-3 text-slate-300">{m.date}</td>
                        <td className="p-3 font-bold text-white">{m.weight} kg</td>
                        <td className="p-3 text-emerald-400">{m.benchPress || '-'} kg</td>
                        <td className="p-3 text-teal-400">{m.squat || '-'} kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkoutEditorModal({ isOpen, initialWorkout, clients, onClose, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    id: initialWorkout?.id || null,
    clientId: initialWorkout?.clientId || clients[0]?.id || '',
    title: initialWorkout?.title || 'Fuerza & Acondicionamiento',
    date: initialWorkout?.date || new Date().toISOString().split('T')[0],
    duration: initialWorkout?.duration || 60,
    sessionGoal: initialWorkout?.sessionGoal || '',
    warmup: initialWorkout?.warmup || '5-10 min movilidad articular activa y activación del core',
    cooldown: initialWorkout?.cooldown || 'Vuelta a la calma y descompresión',
    coachNotes: initialWorkout?.coachNotes || '',
    status: initialWorkout?.status || 'Pendiente',
    exercises: initialWorkout?.exercises ? [...initialWorkout.exercises] : [
      {
        id: `ex_${Date.now()}`,
        name: 'Sentadilla Trasera con Barra',
        sets: 4,
        reps: '8-10',
        weight: '40 kg',
        rpe: '8',
        rest: '90s',
        tempo: '3-0-1-0',
        instructions: 'Mantén el pecho alto y controla el descenso.',
        videoUrl: '',
        notes: '',
        completed: false
      }
    ]
  });

  const addExercise = () => {
    const newEx = {
      id: `ex_${Date.now()}`,
      name: 'Nuevo Ejercicio',
      sets: 3,
      reps: '10',
      weight: 'Corporal',
      rpe: '8',
      rest: '60s',
      tempo: '2-0-1-0',
      instructions: '',
      videoUrl: '',
      notes: '',
      completed: false
    };
    setFormData(prev => ({ ...prev, exercises: [...prev.exercises, newEx] }));
  };

  const removeExercise = (id) => {
    setFormData(prev => ({ ...prev, exercises: prev.exercises.filter(e => e.id !== id) }));
  };

  const updateExercise = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleSave = (publish = true) => {
    onSave({
      ...formData,
      status: publish ? 'Pendiente' : 'Borrador'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/40">
          <div>
            <h2 className="text-xl font-black text-white">
              {formData.id ? 'Editar Entrenamiento' : 'Crear Entrenamiento Personalizado'}
            </h2>
            <p className="text-xs text-slate-400">Asigna parámetros específicos de carga, RPE, descanso y técnica.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Cliente *</label>
              <select 
                value={formData.clientId}
                onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.lastName || ''} ({c.level})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Nombre de la Sesión *</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej. Pierna Fuerza + Hipertrofia"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Fecha Programada</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Objetivo de la Sesión</label>
              <input 
                type="text" 
                value={formData.sessionGoal}
                onChange={e => setFormData({ ...formData, sessionGoal: e.target.value })}
                placeholder="Ej. Sobrecarga progresiva en empujes sin molestias"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Duración Estimada (min)</label>
              <input 
                type="number" 
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Calentamiento Específico</label>
              <textarea 
                rows="2"
                value={formData.warmup}
                onChange={e => setFormData({ ...formData, warmup: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Vuelta a la Calma</label>
              <textarea 
                rows="2"
                value={formData.cooldown}
                onChange={e => setFormData({ ...formData, cooldown: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Exercise Builder */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Lista de Ejercicios</h3>
                <p className="text-xs text-slate-400">Configura cada movimiento detalladamente.</p>
              </div>
              <button 
                type="button"
                onClick={addExercise}
                className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir Ejercicio
              </button>
            </div>

            <div className="space-y-4">
              {formData.exercises.map((ex, index) => (
                <div key={ex.id} className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl relative space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                      #{index + 1}
                    </span>
                    {formData.exercises.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeExercise(ex.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300">Nombre del Ejercicio *</label>
                      <input 
                        type="text" 
                        value={ex.name}
                        onChange={e => updateExercise(ex.id, 'name', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-300">Enlace Vídeo Demostrativo</label>
                      <input 
                        type="url" 
                        placeholder="https://youtube.com/..."
                        value={ex.videoUrl}
                        onChange={e => updateExercise(ex.id, 'videoUrl', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white mt-1"
                      />
                    </div>
                  </div>

                  {/* Quantitative parameters */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400">Series</label>
                      <input 
                        type="number" 
                        value={ex.sets}
                        onChange={e => updateExercise(ex.id, 'sets', parseInt(e.target.value) || 3)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Reps / Tiempo</label>
                      <input 
                        type="text" 
                        value={ex.reps}
                        onChange={e => updateExercise(ex.id, 'reps', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Carga / Peso</label>
                      <input 
                        type="text" 
                        value={ex.weight}
                        onChange={e => updateExercise(ex.id, 'weight', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">RPE (1-10)</label>
                      <input 
                        type="text" 
                        value={ex.rpe}
                        onChange={e => updateExercise(ex.id, 'rpe', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Descanso</label>
                      <input 
                        type="text" 
                        value={ex.rest}
                        onChange={e => updateExercise(ex.id, 'rest', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400">Instrucciones Técnicas y Claves</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Controlar la fase excéntrica, pausa abajo..."
                      value={ex.instructions}
                      onChange={e => updateExercise(ex.id, 'instructions', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          <button 
            type="button" 
            onClick={() => handleSave(false)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
          >
            Guardar como Borrador
          </button>

          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-bold rounded-xl transition"
            >
              Cancelar
            </button>
            <button 
              type="button" 
              onClick={() => handleSave(true)}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" /> Publicar Entrenamiento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientDashboardLayout({ client, activeTab, setActiveTab, workouts, onLogout, onStartWorkout, onUpdateClientProfile }) {
  const nextWorkout = workouts.find(w => w.status === 'Pendiente') || workouts[0];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col pb-20 md:pb-0">
      {/* Mobile-Friendly Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={client.avatar} 
              alt={client.name} 
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40"
            />
            <div>
              <p className="text-xs text-slate-400 font-semibold">Hola de nuevo,</p>
              <h2 className="text-sm font-black text-white">{client.name} {client.lastName || ''}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {client.discipline}
            </span>
            <button 
              onClick={onLogout}
              title="Cerrar sesión"
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full px-4 py-6 flex-1">
        {activeTab === 'home' && (
          <ClientHomeTab 
            client={client} 
            nextWorkout={nextWorkout} 
            workouts={workouts}
            onStartWorkout={onStartWorkout}
            onViewAllWorkouts={() => setActiveTab('workouts')}
          />
        )}

        {activeTab === 'workouts' && (
          <ClientWorkoutsTab 
            workouts={workouts} 
            onStartWorkout={onStartWorkout}
          />
        )}

        {activeTab === 'profile' && (
          <ClientProfileTab 
            client={client} 
            onSave={onUpdateClientProfile}
          />
        )}

        {activeTab === 'progress' && (
          <ClientProgressTab 
            client={client} 
          />
        )}
      </main>

      {/* Bottom Floating Navigation for Mobile / Tablet */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 max-w-lg mx-auto sm:rounded-t-2xl">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { id: 'home', label: 'Inicio', icon: Activity },
            { id: 'workouts', label: 'Entrenos', icon: Dumbbell, badge: workouts.filter(w => w.status === 'Pendiente').length },
            { id: 'progress', label: 'Progreso', icon: TrendingUp },
            { id: 'profile', label: 'Mi Ficha', icon: User },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition relative ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function ClientHomeTab({ client, nextWorkout, workouts, onStartWorkout, onViewAllWorkouts }) {
  const completedCount = workouts.filter(w => w.status === 'Completado').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Tu Plan Deportivo Activo
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-3">
            Objetivo: {client.mainGoal}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Nivel {client.level} • {client.workoutsPerWeek} entrenamientos semanales programados por tu entrenador.
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <div>
              <span className="text-slate-400 text-[10px] block">Peso Actual:</span>
              <span className="text-white font-bold">{client.weight} kg</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Altura:</span>
              <span className="text-white font-bold">{client.height} cm</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Completados:</span>
              <span className="text-emerald-400 font-bold">{completedCount} de {workouts.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Up Workout */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Próxima Sesión Programada</h3>
          <button onClick={onViewAllWorkouts} className="text-xs text-emerald-400 font-bold hover:underline">
            Ver todas ({workouts.length})
          </button>
        </div>

        {nextWorkout ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">
                    {nextWorkout.status}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {nextWorkout.date}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {nextWorkout.duration} min
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mt-2">{nextWorkout.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{nextWorkout.sessionGoal}</p>
                <p className="text-xs text-emerald-400 mt-2 font-semibold">
                  {nextWorkout.exercises?.length || 0} Ejercicios preparados
                </p>
              </div>

              <button 
                onClick={() => onStartWorkout(nextWorkout)}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-xl shadow-emerald-500/25 shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                {nextWorkout.status === 'Completado' ? 'Revisar Sesión' : 'Iniciar Entrenamiento'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-500 text-xs">
            No tienes entrenamientos pendientes en este momento. Tu entrenador publicará uno pronto.
          </div>
        )}
      </div>

      {/* Advice Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-white">Recomendación de ACM Fitness</p>
          <p className="text-slate-400 leading-relaxed">
            Asegúrate de respetar el descanso pautado para cada serie. Al terminar la sesión, anota cualquier sensación o molestia para que tu entrenador pueda adaptar la siguiente carga.
          </p>
        </div>
      </div>
    </div>
  );
}

function ClientWorkoutsTab({ workouts, onStartWorkout }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-white">Mis Entrenamientos</h2>
        <p className="text-xs text-slate-400">Historial y sesiones asignadas exclusivamente a tu cuenta.</p>
      </div>

      <div className="space-y-3">
        {workouts.map(wk => (
          <div 
            key={wk.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    wk.status === 'Completado' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {wk.status}
                  </span>
                  <span className="text-xs text-slate-400">{wk.date}</span>
                  <span className="text-xs text-slate-400">• {wk.duration} min</span>
                </div>
                <h4 className="text-base font-bold text-white mt-1.5">{wk.title}</h4>
                <p className="text-xs text-slate-400">{wk.sessionGoal}</p>
                <p className="text-[11px] text-slate-500 mt-1">{wk.exercises?.length || 0} ejercicios</p>
              </div>

              <button 
                onClick={() => onStartWorkout(wk)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition self-start sm:self-auto ${
                  wk.status === 'Completado' 
                    ? 'bg-slate-800 text-slate-300 hover:text-white' 
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {wk.status === 'Completado' ? 'Ver Resumen' : 'Comenzar'}
              </button>
            </div>

            {wk.feedback && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="font-bold text-emerald-400">Tu feedback enviado:</span> "{wk.feedback}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientProfileTab({ client, onSave }) {
  const [profile, setProfile] = useState({ ...client });

  const handleUpdate = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Mi Ficha Personal</h2>
        <p className="text-xs text-slate-400">Consulta y mantén al día tus datos físicos y de disponibilidad.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Datos Personales y Físicos</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Nombre</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300">Apellidos</label>
              <input 
                type="text" 
                value={profile.lastName || ''}
                onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Email de acceso (No modificable)</label>
              <input 
                type="email" disabled
                value={profile.email}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 mt-1 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300">Teléfono</label>
              <input 
                type="tel"
                value={profile.phone || ''}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Peso actual (kg)</label>
              <input 
                type="number" step="0.1"
                value={profile.weight}
                onChange={e => setProfile({ ...profile, weight: parseFloat(e.target.value) || profile.weight })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300">Altura (cm)</label>
              <input 
                type="number"
                value={profile.height}
                onChange={e => setProfile({ ...profile, height: parseInt(e.target.value) || profile.height })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Objetivos y Salud</h3>
          <div>
            <label className="text-xs font-bold text-slate-300">Objetivo Principal</label>
            <input 
              type="text"
              value={profile.mainGoal}
              onChange={e => setProfile({ ...profile, mainGoal: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white mt-1"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300">Lesiones o Molestias Actuales</label>
            <textarea 
              rows="2"
              value={profile.injuries || ''}
              onChange={e => setProfile({ ...profile, injuries: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
          >
            Actualizar Mi Ficha
          </button>
        </div>
      </form>
    </div>
  );
}

function ClientProgressTab({ client }) {
  const history = client.metricsHistory || [];
  const latest = history[history.length - 1] || {};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Mi Progreso</h2>
        <p className="text-xs text-slate-400">Evolución de peso corporal y marcas de fuerza registradas por tu entrenador.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-slate-400">Peso Actual</span>
          <p className="text-2xl font-black text-white mt-1">{client.weight} kg</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-slate-400">Press Banca Estimado</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{latest.benchPress || '-'} kg</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Sentadilla Estimada</span>
          <p className="text-2xl font-black text-teal-400 mt-1">{latest.squat || '-'} kg</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Historial de Registros</h3>
        <div className="space-y-3">
          {history.map((record, idx) => (
            <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{record.date}</span>
              <span className="text-white font-bold">{record.weight} kg</span>
              <span className="text-emerald-400 font-semibold">Banca: {record.benchPress || '-'} kg</span>
              <span className="text-teal-400 font-semibold">Sentadilla: {record.squat || '-'} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActiveWorkoutExecutionModal({ workout, onClose, onFinish }) {
  const [exercises, setExercises] = useState(workout.exercises || []);
  const [feedback, setFeedback] = useState(workout.feedback || '');
  const [rating, setRating] = useState(workout.rating || 5);

  const [timerSeconds, setTimerSeconds] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const startTimer = (seconds) => {
    setTimerSeconds(seconds);
    setIsTimerRunning(true);
  };

  const toggleExercise = (id) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === id) {
        return { ...ex, completed: !ex.completed };
      }
      return ex;
    }));
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const progressPercent = Math.round((completedCount / (exercises.length || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-y-auto">
      {/* Top Session Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <X className="w-4 h-4" /> Salir
          </button>
          <div className="text-center">
            <h2 className="text-sm font-black text-white">{workout.title}</h2>
            <p className="text-[10px] text-emerald-400 font-semibold">{progressPercent}% completado</p>
          </div>
          <div className="w-12 text-right">
            <span className="text-xs font-bold text-slate-300">{completedCount}/{exercises.length}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Execution Body */}
      <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-6 flex-1">
        {/* Rest Timer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Temporizador de Descanso</p>
              <p className="text-base font-black text-emerald-400">
                {timerSeconds !== null 
                  ? `${Math.floor(timerSeconds / 60)}:${(timerSeconds % 60).toString().padStart(2, '0')}` 
                  : '0:00'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => startTimer(60)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200"
            >
              60s
            </button>
            <button 
              onClick={() => startTimer(90)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200"
            >
              90s
            </button>
            <button 
              onClick={() => startTimer(120)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200"
            >
              120s
            </button>
            {isTimerRunning && (
              <button 
                onClick={() => setIsTimerRunning(false)}
                className="px-2 py-1.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg"
              >
                Pausar
              </button>
            )}
          </div>
        </div>

        {/* Warmup */}
        {workout.warmup && (
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
            <p className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">Calentamiento Previo</p>
            <p className="text-slate-300">{workout.warmup}</p>
          </div>
        )}

        {/* Exercises */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Ejercicios de la Sesión</h3>
          
          {exercises.map((ex, index) => (
            <div 
              key={ex.id}
              className={`p-5 rounded-3xl border transition ${
                ex.completed 
                  ? 'bg-slate-900/40 border-emerald-500/40' 
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <button 
                    onClick={() => toggleExercise(ex.id)}
                    className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition shrink-0 ${
                      ex.completed 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'border-2 border-slate-600 hover:border-emerald-400'
                    }`}
                  >
                    {ex.completed ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Ejercicio #{index + 1}</span>
                    <h4 className={`text-base font-bold transition ${ex.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {ex.name}
                    </h4>
                  </div>
                </div>

                {ex.videoUrl && (
                  <a 
                    href={ex.videoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs flex items-center gap-1 font-bold shrink-0"
                  >
                    <Video className="w-3.5 h-3.5" /> Vídeo
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-400 font-bold block">Series x Reps</span>
                  <span className="text-xs font-black text-white">{ex.sets} × {ex.reps}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-400 font-bold block">Carga / Peso</span>
                  <span className="text-xs font-black text-emerald-400">{ex.weight}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-400 font-bold block">RPE / Esfuerzo</span>
                  <span className="text-xs font-black text-amber-400">{ex.rpe || '8'}/10</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[9px] uppercase text-slate-400 font-bold block">Descanso</span>
                  <span className="text-xs font-black text-slate-200">{ex.rest || '90s'}</span>
                </div>
              </div>

              {ex.instructions && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300">
                  <span className="font-bold text-slate-400">Técnica: </span>
                  {ex.instructions}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Feedback y Sensaciones de la Sesión</h3>
          
          <div>
            <label className="text-xs text-slate-400 block mb-2">Valoración general del entrenamiento:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-xl transition ${star <= rating ? 'text-amber-400' : 'text-slate-700'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Comentarios para tu entrenador:</label>
            <textarea 
              rows="3"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="¿Cómo te has sentido? ¿Alguna molestia en hombro, rodilla...? ¿Pudiste subir peso?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="button"
            onClick={() => onFinish(workout.id, exercises, feedback, rating)}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> Finalizar y Enviar Feedback
          </button>
        </div>
      </div>
    </div>
  );
}