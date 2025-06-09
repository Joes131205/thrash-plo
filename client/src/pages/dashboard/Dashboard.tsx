import { useState } from "react";
import AppLayout from "@/components/template/appLayout/appLayout";
import DLHContent from "@/components/template/dashboardDLH/DLHContent";
import CommunityContent from "@/components/template/dashboardCommunity/CommunityContent";
import AdminContent from "@/components/template/dashboardAdmin/AdminContent";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const role = "Admin";

  const renderContent = () => {
    if (role === role) return <DLHContent activeTab={activeTab} setActiveTab={setActiveTab} isShowModalDelete={isShowModalDelete} setIsShowModalDelete={setIsShowModalDelete} />;
    if (role === role) return <CommunityContent activeTab={activeTab} setActiveTab={setActiveTab} isShowModalDelete={isShowModalDelete} setIsShowModalDelete={setIsShowModalDelete} />;
    if (role === role) return <AdminContent activeTab={activeTab} setActiveTab={setActiveTab} isShowModalDelete={isShowModalDelete} setIsShowModalDelete={setIsShowModalDelete} />;
    return <p>Role tidak dikenal</p>;
  };

  return (
    <AppLayout role={role} activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AppLayout>
  );
}
