import { IcArticle, IcClipboard, IcClipboardList, IcHamburger, IcUserRound } from "@/assets/icons";
import styles from "../../../pages/dashboard/Dashboard.module.css";
import { ImgCreator } from "@/assets/images";
import StatsCard from "@/components/molecules/statisticsCard/statsCard";
import MonthlyReportChart from "@/components/organisms/barChart/monthlyReportChart";
import ProgressItem from "@/components/organisms/progressItem/progressItem";
import ArticleTable from "@/components/organisms/articleTable/articleTable";
import RequestComTable from "@/components/organisms/requestComTable/requestComTable";

interface CommunityContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isShowModalDelete: boolean;
  setIsShowModalDelete: (value: boolean) => void;
}

export default function CommunityContent({ activeTab, setActiveTab, isShowModalDelete, setIsShowModalDelete }: CommunityContentProps) {
  const progressData = [
    { groupName: "Pandawara Group", status: "Sedang Diangkut", location: "Sungai Kapuas", date: "24-04-2025" },
    { groupName: "Sukarela Group", status: "Menunggu Dijemput", location: "Sungai Mahakam", date: "24-04-2025" },
    { groupName: "Green Group", status: "Sedang Diangkut", location: "Taman Anggrek", date: "24-04-2025" },
    { groupName: "Clean Group", status: "Menunggu Dijemput", location: "Pasar Slipi", date: "24-04-2025" },
    { groupName: "Yayasan Group", status: "Sedang Diangkut", location: "AEON Jakarta", date: "24-04-2025" },
  ];

  const dummyData = [
    {
      name: "Bu Siti",
      location: "Sungai Bidadari",
      date: "24-04-2025",
      elapsed: "2 days",
      status: "Menunggu",
      verification: "Terima",
    },
    {
      name: "Pak Jumala",
      location: "Taman Kencana",
      date: "24-04-2025",
      elapsed: "2 days",
      status: "Menunggu",
      verification: "Terima",
    },
    {
      name: "Bu Asih",
      location: "Roxy",
      date: "22-04-2025",
      elapsed: "4 days",
      status: "Selesai",
      verification: "Ditolak",
    },
  ];

  const articleDummy = [
    {
      title: "Kampanye Kebersihan Kota",
      content: "Gerakan masyarakat membersihkan lingkungan sekitar dilakukan serentak di 10 kecamatan.",
      releaseDate: "2025-06-01",
      imageUrl: "https://via.placeholder.com/150x100.png?text=Artikel+1",
      status: "Menunggu",
    },
    {
      title: "Inovasi Bank Sampah Digital",
      content: "Aplikasi baru memungkinkan warga setor sampah dan tukar poin dari rumah.",
      releaseDate: "2025-06-03",
      imageUrl: "https://via.placeholder.com/150x100.png?text=Artikel+2",
      status: "Proses",
    },
    {
      title: "Pandawara Bersama Pemda",
      content: "Kolaborasi besar akan dilakukan antara komunitas Pandawara dan pemerintah daerah.",
      releaseDate: "2025-06-08",
      imageUrl: "https://via.placeholder.com/150x100.png?text=Artikel+3",
      status: "Selesai",
    },
  ];

  const sedangDiangkut = progressData.filter((item) => item.status === "Sedang Diangkut");
  const menungguDijemput = progressData.filter((item) => item.status === "Menunggu Dijemput");
  const baruMasuk = progressData.filter((item) => item.status === "Menunggu Dijemput");

  return (
    <div>
      {/* ID : Dashboard */}
      {activeTab === "dashboard" && (
        <div id="dashboard">
          {/* Stats Card */}
          <div className={styles.dashboardSection}>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>
            <div className={styles.statsContainer}>
              <StatsCard title="Laporan Baru" value={dummyData.length} icon={IcClipboard} />
              <StatsCard title="Jumlah Artikel" value={125} icon={IcArticle} />
              <StatsCard title="Jumlah Laporan" value={125} icon={IcClipboardList} />
              <StatsCard title="Jumlah User" value={125} icon={IcUserRound} />
            </div>
          </div>

          {/* Grid 2x2 Layout */}
          <div className={styles.gridLayout}>
            {/* Chart */}
            <div className={styles.gridColumn}>
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.centeredTitle}`}>Total Laporan Masuk Perbulan</h3>
                <MonthlyReportChart />
              </div>
            </div>

            {/* Request Urgent */}
            <div className={styles.gridColumn}>
              <div className={`${styles.card} ${styles.cardWithPadding}`}>
                <h3 className={`${styles.cardTitle} ${styles.borderBottom}`}>Request Urgent</h3>
                <div className={styles.cardContent}>
                  {menungguDijemput.length > 0 ? menungguDijemput.map((item, index) => <ProgressItem key={index} avatar={ImgCreator} {...item} isShowButton />) : <p className={styles.italicText}>Belum ada laporan baru masuk.</p>}
                </div>
              </div>
            </div>

            {/* Progress Saat Ini */}
            <div className={styles.gridColumn}>
              <div className={`${styles.card} ${styles.cardWithPadding}`}>
                <h3 className={`${styles.cardTitle} ${styles.borderBottom}`}>Progress Saat Ini</h3>
                <div className={styles.cardContent}>
                  {sedangDiangkut.length > 0 ? sedangDiangkut.map((item, index) => <ProgressItem key={index} avatar={ImgCreator} {...item} />) : <p className={styles.italicText}>Belum ada laporan baru masuk.</p>}
                </div>
              </div>
            </div>

            {/* Baru Masuk */}
            <div className={styles.gridColumn}>
              <div className={`${styles.card} ${styles.cardWithPadding}`}>
                <h3 className={`${styles.cardTitle} ${styles.borderBottom}`}>Baru Masuk</h3>
                <div className={styles.cardContent}>
                  {baruMasuk.length > 0 ? baruMasuk.map((item, index) => <ProgressItem key={index} avatar={ImgCreator} {...item} />) : <p className={styles.italicText}>Belum ada laporan baru masuk.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ID : Request */}
      {activeTab === "request" && (
        <div id="request" className={styles.tabContent}>
          <h1 className={styles.tabTitle}>Daftar Permintaan dan Progress</h1>
          {/* <RequestComTable data={dummyData} /> */}
        </div>
      )}

      {/* ID : Article */}
      {activeTab === "artikel" && (
        <div id="article" className={styles.tabContent}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 className={styles.tabTitle}>Daftar Artikel</h1>
            <button className={styles.button}>Tambah</button>
          </div>
          <ArticleTable data={articleDummy} onEditClick={(index) => console.log("Edit index:", index)} onDeleteClick={() => setIsShowModalDelete(true)} />
          {/* {isShowModalDelete && (
                <ModalConfirmation
                  title="Konfirmasi Hapus"
                  message="Apakah Anda yakin ingin menghapus artikel ini?"
                  onCancel={() => {
                    console.log("Cancel clicked");
                    setIsShowModalDelete(false);
                  }}
                  onConfirm={() => {
                    console.log("Confirm clicked");
                    setIsShowModalDelete(false);
                  }}
                  cancelLabel="Batal"
                  confirmLabel="Ya, Hapus"
                />
              )} */}
        </div>
      )}

      {/* ID : Relawan */}
      {activeTab === "relawan" && (
        <div id="relawan" className={styles.tabContent}>
          <h1 className={styles.tabTitle}>Daftar Relawan</h1>
          {/* Konten report */}
        </div>
      )}

      {/* ID : Aksi Bersih */}
      {activeTab === "aksi-bersih" && (
        <div id="aksi" className={styles.tabContent}>
          <h1 className={styles.tabTitle}>Daftar Aksi Bersih</h1>
          {/* Konten report */}
        </div>
      )}
    </div>
  );
}
