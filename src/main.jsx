import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bot,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  HeartHandshake,
  Home,
  Medal,
  MessageCircle,
  Phone,
  Pill,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
} from "lucide-react";
import "./styles.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "caregivers", label: "Caregivers", icon: Users },
  { id: "assistant", label: "Assistant", icon: Bot },
  { id: "profile", label: "Profile", icon: User },
];

const mockUser = {
  name: "Margaret Chen",
  age: 72,
  preferredName: "Maggie",
  healthId: "HC-2048",
  primaryDoctor: "Dr. Amelia Patel",
  emergencyContact: "Daniel Chen, Son",
};

const dashboardCards = [
  {
    title: "Upcoming appointments",
    value: "Cardiology check-up",
    detail: "Tuesday, 10:30 AM",
    icon: CalendarDays,
    tone: "blue",
  },
  {
    title: "Current conditions",
    value: "3 being monitored",
    detail: "Blood pressure, arthritis, cholesterol",
    icon: HeartHandshake,
    tone: "green",
  },
  {
    title: "Medical history",
    value: "Summary ready",
    detail: "Recent notes and key records",
    icon: ClipboardList,
    tone: "mint",
  },
  {
    title: "Specialist recommendations",
    value: "2 suggestions",
    detail: "Physio and nutrition support",
    icon: Stethoscope,
    tone: "blue",
  },
  {
    title: "Health rewards",
    value: "820 points",
    detail: "Next reward at 1,000 points",
    icon: Medal,
    tone: "gold",
  },
];

const caregivers = [
  {
    name: "Daniel Chen",
    role: "Son",
    status: "Primary caregiver",
    permissions: {
      "Medical history": true,
      Appointments: true,
      "Current conditions": true,
      "Care plans": true,
    },
  },
  {
    name: "Ava Williams",
    role: "Neighbour",
    status: "Support contact",
    permissions: {
      "Medical history": false,
      Appointments: true,
      "Current conditions": false,
      "Care plans": true,
    },
  },
];

const profileSections = [
  {
    title: "Medical history",
    items: ["Knee replacement, 2021", "Seasonal allergies", "Annual wellness checks"],
  },
  {
    title: "Current conditions",
    items: ["High blood pressure", "Mild arthritis", "Cholesterol monitoring"],
  },
  {
    title: "App preferences",
    items: ["Large text enabled", "Daily reminder at 8:00 AM", "Share appointment alerts"],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="page-shell">
      <main className="phone-frame" aria-label="Healthcare app mobile prototype">
        <Header activeTab={activeTab} />
        <section className="screen-content">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "caregivers" && <CaregiverAccess />}
          {activeTab === "assistant" && <AIAssistant />}
          {activeTab === "profile" && <Profile />}
        </section>
        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </main>
    </div>
  );
}

function Header({ activeTab }) {
  const titles = {
    dashboard: "Good morning, Maggie",
    caregivers: "Caregiver Access",
    assistant: "AI Assistant",
    profile: "My Profile",
  };

  const subtitles = {
    dashboard: "Here is your health overview for today.",
    caregivers: "Choose what your trusted helpers can see.",
    assistant: "Ask simple questions about your care.",
    profile: "Your personal health information.",
  };

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">CareCircle Health</p>
        <h1>{titles[activeTab]}</h1>
        <p>{subtitles[activeTab]}</p>
      </div>
      <div className="header-badge" aria-hidden="true">
        <ShieldCheck size={28} />
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="stack">
      <Card className="welcome-card">
        <div>
          <p className="section-label">Today</p>
          <h2>Everything important in one place</h2>
          <p>Appointments, care notes, and rewards are gathered here for easy review.</p>
        </div>
      </Card>

      <div className="card-grid">
        {dashboardCards.map((card) => (
          <HealthSummaryCard key={card.title} {...card} />
        ))}
      </div>

      <PlaceholderPanel title="Care plan preview" />
    </div>
  );
}

function CaregiverAccess() {
  return (
    <div className="stack">
      <Card className="info-card">
        <div className="icon-circle green">
          <Users size={24} />
        </div>
        <div>
          <h2>Trusted support</h2>
          <p>Access can be changed or removed anytime.</p>
        </div>
      </Card>

      <button className="primary-action" type="button">
        <Plus size={22} />
        Add caregiver
      </button>

      {caregivers.map((caregiver) => (
        <CaregiverCard key={caregiver.name} caregiver={caregiver} />
      ))}

      <PlaceholderPanel title="Detailed permission notes" />
    </div>
  );
}

function CaregiverCard({ caregiver }) {
  return (
    <Card>
      <div className="caregiver-header">
        <div>
          <h2>{caregiver.name}</h2>
          <p>{caregiver.role} - {caregiver.status}</p>
        </div>
        <button className="text-button" type="button">Edit</button>
      </div>

      <div className="permission-list">
        {Object.entries(caregiver.permissions).map(([label, enabled]) => (
          <PermissionToggle key={label} label={label} enabled={enabled} />
        ))}
      </div>
    </Card>
  );
}

function AIAssistant() {
  const quickActions = [
    "Explain my care plan",
    "Prepare for appointment",
    "Medication reminder",
    "Ask about symptoms",
  ];

  return (
    <div className="assistant-layout">
      <Card className="assistant-intro">
        <div className="icon-circle blue">
          <Sparkles size={24} />
        </div>
        <div>
          <h2>Hello Maggie, I am here to help.</h2>
          <p>You can ask me to explain health information in plain language.</p>
        </div>
      </Card>

      <div className="quick-actions" aria-label="Example assistant actions">
        {quickActions.map((action) => (
          <button key={action} type="button">{action}</button>
        ))}
      </div>

      <div className="chat-window">
        <ChatBubble sender="assistant">
          Good morning. Would you like help reviewing your next appointment?
        </ChatBubble>
        <ChatBubble sender="user">
          Yes, please help me prepare.
        </ChatBubble>
        <ChatBubble sender="assistant">
          I can make a short checklist and questions for your doctor.
        </ChatBubble>
      </div>

      <div className="chat-input" aria-label="Display only chat input">
        <span>Type a question...</span>
        <button type="button">
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="stack">
      <Card className="profile-card">
        <div className="avatar" aria-hidden="true">MC</div>
        <div>
          <p className="section-label">Older adult profile</p>
          <h2>{mockUser.name}</h2>
          <p>Age {mockUser.age} - ID {mockUser.healthId}</p>
          <p>Primary doctor: {mockUser.primaryDoctor}</p>
        </div>
      </Card>

      {profileSections.map((section) => (
        <Card key={section.title}>
          <SectionHeading title={section.title} />
          <ul className="simple-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      ))}

      <Card>
        <SectionHeading title="Emergency contact" icon={Phone} />
        <p className="large-detail">{mockUser.emergencyContact}</p>
      </Card>

      <Card>
        <SectionHeading title="Incentives progress" icon={Medal} />
        <div className="progress-row">
          <span>820 / 1,000 points</span>
          <strong>82%</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" />
        </div>
      </Card>

      <PlaceholderPanel title="Documents and detailed records" />
    </div>
  );
}

function Card({ children, className = "" }) {
  return <article className={`card ${className}`}>{children}</article>;
}

function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={activeTab === id ? "active" : ""}
          onClick={() => onChange(id)}
          aria-current={activeTab === id ? "page" : undefined}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function HealthSummaryCard({ title, value, detail, icon: Icon, tone }) {
  return (
    <Card className="summary-card">
      <div className={`icon-circle ${tone}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="section-label">{title}</p>
        <h2>{value}</h2>
        <p>{detail}</p>
      </div>
      <ChevronRight className="card-arrow" size={22} aria-hidden="true" />
    </Card>
  );
}

function PermissionToggle({ label, enabled }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="permission-row">
      <div>
        <strong>{label}</strong>
        <span>{isEnabled ? "Shared with caregiver" : "Private for now"}</span>
      </div>
      <button
        type="button"
        className={`toggle ${isEnabled ? "on" : ""}`}
        onClick={() => setIsEnabled((current) => !current)}
        aria-pressed={isEnabled}
        aria-label={`${label} access ${isEnabled ? "on" : "off"}`}
      >
        <span />
      </button>
    </div>
  );
}

function ChatBubble({ sender, children }) {
  return (
    <div className={`chat-bubble ${sender}`}>
      {sender === "assistant" && <Pill size={18} aria-hidden="true" />}
      <p>{children}</p>
    </div>
  );
}

function SectionHeading({ title, icon: Icon = ClipboardList }) {
  return (
    <div className="section-heading">
      <Icon size={22} />
      <h2>{title}</h2>
    </div>
  );
}

function PlaceholderPanel({ title }) {
  return (
    <Card className="placeholder-panel">
      <SectionHeading title={title} />
      <p>Placeholder area for more detailed content in the next prototype stage.</p>
    </Card>
  );
}

createRoot(document.getElementById("root")).render(<App />);
