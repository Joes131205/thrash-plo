import {
    IcArticle,
    IcClipboard,
    IcClipboardList,
    IcHamburger,
    IcPlus,
    IcUserRound,
} from "@/assets/icons";
import styles from "./Dashboard.module.css";
import { ImgCreator } from "@/assets/images";
import StatsCard from "@/components/molecules/statisticsCard/statsCard";
import MonthlyReportChart from "@/components/organisms/barChart/monthlyReportChart";
import ProgressItem from "@/components/organisms/progressItem/progressItem";
import RequestTable from "@/components/organisms/requestTable/requestTable";
import ArticleTable from "@/components/organisms/articleTable/articleTable";
import { SummaryCard } from "@/components/molecules/summaryCard/summaryCard";
import { ContributorTable } from "@/components/organisms/contributorTable/contributorTable";
import { useState } from "react";
import PictInput from "@/components/molecules/pictInput/pictInput";
import ReportInput from "@/components/molecules/reportInput/reportInput";
import Dropdown from "@/components/molecules/dropdownMain/DropdownMain";
import Sidebar from "@/components/molecules/sideBar/sideBar";
import Topbar from "@/components/molecules/topBar/topBar";
import RequestComTable from "@/components/organisms/requestComTable/requestComTable";

export default function DashboardCom() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [isShowFormAksi, setIsShowFormAksi] = useState(false);
    const [photoBefore, setPhotoBefore] = useState<string | null>(null);
    const [photoAfter, setPhotoAfter] = useState<string | null>(null);
    const [notesAksi, setNotesAksi] = useState("");
    const [trashType, setTrashType] = useState("");
    const [isShowTabRequest, setIsShowTabRequest] = useState(true);

    const role = "Komunitas";

    const progressData = [
        {
            groupName: "Pak Halim",
            status: "Sedang Dibersihkan",
            location: "AEON Jakarta",
            date: "24-04-2025",
        },
        {
            groupName: "Bu Sri",
            status: "Sedang Dibersihkan",
            location: "Kemanggisan",
            date: "24-04-2025",
        },
        {
            groupName: "Bu Sri",
            status: "Menunggu Diterima",
            location: "Senayan",
            date: "24-04-2025",
        },
        {
            groupName: "Bu Sri",
            status: "Menunggu Diterima",
            location: "Petamburan",
            date: "24-04-2025",
        },
    ];

    const dummyData = [
        {
            name: "Bu Sri",
            location: "Sungai Bidadari",
            date: "24-04-2025",
            elapsed: "2 days",
            status: "Menunggu",
            verification: "Terima",
        },
        {
            name: "Pak Halim",
            location: "Taman Kencana",
            date: "24-04-2025",
            elapsed: "2 days",
            status: "Menunggu",
            verification: "Terima",
        },
        {
            name: "Pak Mustofa",
            location: "Roxy",
            date: "22-04-2025",
            elapsed: "4 days",
            status: "Proses",
            verification: "Tandai Selesai",
        },
    ];

    const articleDummy = [
        {
            title: "Kampanye Kebersihan Kota",
            content:
                "Gerakan masyarakat membersihkan lingkungan sekitar dilakukan serentak di 10 kecamatan.",
            releaseDate: "2025-06-01",
            imageUrl: "https://via.placeholder.com/150x100.png?text=Artikel+1",
            status: "Menunggu",
        },
        {
            title: "Inovasi Bank Sampah Digital",
            content:
                "Aplikasi baru memungkinkan warga setor sampah dan tukar poin dari rumah.",
            releaseDate: "2025-06-03",
            imageUrl: "https://via.placeholder.com/150x100.png?text=Artikel+2",
            status: "Proses",
        },
        {
            title: "Pandawara Bersama Pemda",
            content:
                "Kolaborasi besar akan dilakukan antara komunitas Pandawara dan pemerintah daerah.",
            releaseDate: "2025-06-08",
            imageUrl: "https://via.placeholder.com/150x100.png?text=Artikel+3",
            status: "Selesai",
        },
    ];

    const sedangDibersihkan = progressData.filter(
        (item) => item.status === "Sedang Dibersihkan"
    );
    const menungguDiterima = progressData.filter(
        (item) => item.status === "Menunggu Diterima"
    );
    const baruMasuk = progressData.filter(
        (item) => item.status === "Menunggu Dijemput"
    );

    return (
        <div className={styles.container}>
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isVisible={isSidebarVisible}
                role={role}
            />

            <div
                className={
                    isSidebarVisible
                        ? styles.mainContent
                        : `${styles.mainContent} ${styles.mainContentShifted}`
                }
            >
                <div className={styles.contentWrapper}>
                    <Topbar
                        user={{ name: "Jannsen123", role, avatar: ImgCreator }}
                        hamburgerIcon={IcHamburger}
                        onToggleSidebar={() =>
                            setSidebarVisible((prev) => !prev)
                        }
                    />

                    <div>
                        {/* ID : Dashboard */}
                        {activeTab === "dashboard" && (
                            <div id="dashboard">
                                {/* Stats Card */}
                                <div className={styles.dashboardSection}>
                                    <h1 className={styles.dashboardTitle}>
                                        Dashboard
                                    </h1>
                                    <div className={styles.statsContainer}>
                                        <StatsCard
                                            title="Laporan Baru"
                                            value={dummyData.length}
                                            icon={IcClipboard}
                                        />
                                        <StatsCard
                                            title="Jumlah Artikel"
                                            value={125}
                                            icon={IcArticle}
                                        />
                                        <StatsCard
                                            title="Jumlah Laporan"
                                            value={125}
                                            icon={IcClipboardList}
                                        />
                                        <StatsCard
                                            title="Jumlah User"
                                            value={125}
                                            icon={IcUserRound}
                                        />
                                    </div>
                                </div>

                                {/* Grid 2x2 Layout */}
                                <div className={styles.gridLayout}>
                                    {/* Chart */}
                                    <div className={styles.gridColumn}>
                                        <div className={styles.card}>
                                            <h3
                                                className={`${styles.cardTitle} ${styles.centeredTitle}`}
                                            >
                                                Total Laporan Masuk Perbulan
                                            </h3>
                                            <MonthlyReportChart />
                                        </div>
                                    </div>

                                    {/* Request Urgent */}
                                    <div className={styles.gridColumn}>
                                        <div
                                            className={`${styles.card} ${styles.cardWithPadding}`}
                                        >
                                            <h3
                                                className={`${styles.cardTitle} ${styles.borderBottom}`}
                                            >
                                                Permintaan Terbaru
                                            </h3>
                                            <div className={styles.cardContent}>
                                                {menungguDiterima.length > 0 ? (
                                                    menungguDiterima.map(
                                                        (item, index) => (
                                                            <ProgressItem
                                                                key={index}
                                                                avatar={
                                                                    ImgCreator
                                                                }
                                                                {...item}
                                                                isShowButton
                                                            />
                                                        )
                                                    )
                                                ) : (
                                                    <p
                                                        className={
                                                            styles.italicText
                                                        }
                                                    >
                                                        Belum ada laporan baru
                                                        masuk.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Saat Ini */}
                                    <div className={styles.gridColumn}>
                                        <div
                                            className={`${styles.card} ${styles.cardWithPadding}`}
                                        >
                                            <h3
                                                className={`${styles.cardTitle} ${styles.borderBottom}`}
                                            >
                                                Progress Saat Ini
                                            </h3>
                                            <div className={styles.cardContent}>
                                                {sedangDibersihkan.length >
                                                0 ? (
                                                    sedangDibersihkan.map(
                                                        (item, index) => (
                                                            <ProgressItem
                                                                key={index}
                                                                avatar={
                                                                    ImgCreator
                                                                }
                                                                {...item}
                                                            />
                                                        )
                                                    )
                                                ) : (
                                                    <p
                                                        className={
                                                            styles.italicText
                                                        }
                                                    >
                                                        Belum ada laporan baru
                                                        masuk.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Baru Masuk */}
                                    <div className={styles.gridColumn}>
                                        <div
                                            className={`${styles.card} ${styles.cardWithPadding}`}
                                        >
                                            <h3
                                                className={`${styles.cardTitle} ${styles.borderBottom}`}
                                            >
                                                Permintaan Relawan
                                            </h3>
                                            <div className={styles.cardContent}>
                                                {baruMasuk.length > 0 ? (
                                                    baruMasuk.map(
                                                        (item, index) => (
                                                            <ProgressItem
                                                                key={index}
                                                                avatar={
                                                                    ImgCreator
                                                                }
                                                                {...item}
                                                            />
                                                        )
                                                    )
                                                ) : (
                                                    <p
                                                        className={
                                                            styles.italicText
                                                        }
                                                    >
                                                        Belum ada laporan baru
                                                        masuk.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ID : Request */}
                        {activeTab === "request" && (
                            <>
                                {isShowTabRequest && (
                                    <div
                                        id="request"
                                        className={styles.tabContent}
                                    >
                                        <h1 className={styles.tabTitle}>
                                            Daftar Permintaan dan Progress
                                        </h1>
                                        <RequestComTable
                                            data={dummyData}
                                            // onClickVerif={() => {
                                            //   setIsShowTabRequest(false);
                                            //   setIsShowFormAksi(true);
                                            // }}
                                        />
                                    </div>
                                )}
                                {isShowFormAksi && (
                                    <div className={styles.formAksi}>
                                        <div
                                            id="request"
                                            className={styles.tabContent}
                                        >
                                            <h1 className={styles.tabTitle}>
                                                Unggah Bukti Kegiatan
                                            </h1>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: 2,
                                                    backgroundColor: "#2E2E2E",
                                                }}
                                            ></div>

                                            <p
                                                style={{
                                                    fontSize: 20,
                                                    color: "#2e2e2e",
                                                }}
                                            >
                                                Silakan unggah foto atau dokumen
                                                sebagai bukti bahwa aksi telah
                                                dilakukan. <br />
                                                <span>
                                                    (Unggah foto saat kegiatan
                                                    dan hasil dari kegiatan){" "}
                                                </span>
                                            </p>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: 30,
                                                }}
                                            >
                                                <PictInput
                                                    icon={IcPlus}
                                                    placeholder="Unggah Foto Disini"
                                                    isShowLabel={true}
                                                    label={`Foto Ketika Kegiatan `}
                                                    isDarkBorder={true}
                                                    value={photoBefore}
                                                    onChange={(val) => {
                                                        setPhotoBefore(val);
                                                    }}
                                                />
                                                <PictInput
                                                    icon={IcPlus}
                                                    placeholder="Unggah Foto Disini"
                                                    isShowLabel={true}
                                                    label={`Foto Hasil Kegiatan `}
                                                    isDarkBorder={true}
                                                    value={photoAfter}
                                                    onChange={(val) => {
                                                        setPhotoAfter(val);
                                                    }}
                                                />
                                            </div>
                                            <Dropdown
                                                label={`Jenis Sampah `}
                                                options={[
                                                    "Sampah Plastik",
                                                    "Sampah Kaleng",
                                                    "Sampah Seng",
                                                ]}
                                                placeholder="Pilih Jenis Sampah"
                                                value={trashType}
                                                onSelect={(value) => {
                                                    setTrashType(value);
                                                }}
                                            />
                                            <ReportInput
                                                label="Deskripsi Hasil Aksi Bersih"
                                                placeholder="Masukkan catatan terkait sampah (opsional)"
                                                value={notesAksi}
                                                onChange={(e) =>
                                                    setNotesAksi(e.target.value)
                                                }
                                                isTextarea
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    gap: 15,
                                                }}
                                            >
                                                <button
                                                    style={{
                                                        cursor: "pointer",
                                                        backgroundColor:
                                                            "#3D3D3D",
                                                        color: "#fff",
                                                        padding: "10px 40px",
                                                        fontWeight:
                                                            "var(--weight-semibold)",
                                                        borderRadius: 6,
                                                    }}
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    style={{
                                                        cursor: "pointer",
                                                        backgroundColor:
                                                            "#2CD789",
                                                        color: "#fff",
                                                        padding: "10px 40px",
                                                        fontWeight:
                                                            "var(--weight-semibold)",
                                                        borderRadius: 6,
                                                    }}
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* ID : Relawan */}
                        {activeTab === "relawan" && (
                            <div id="relawan" className={styles.tabContent}>
                                <h1 className={styles.tabTitle}>
                                    Daftar Relawan
                                </h1>
                            </div>
                        )}

                        {/* ID : Aksi Bersih */}
                        {activeTab === "aksi-bersih" && (
                            <div id="aksi-bersih" className={styles.tabContent}>
                                <h1 className={styles.tabTitle}>
                                    Daftar Aksi Bersih
                                </h1>
                            </div>
                        )}

                        {/* ID : Article */}
                        {activeTab === "artikel" && (
                            <div id="article" className={styles.tabContent}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h1 className={styles.tabTitle}>
                                        Daftar Artikel
                                    </h1>
                                    <button className={styles.button}>
                                        Tambah
                                    </button>
                                </div>
                                <ArticleTable
                                    data={articleDummy}
                                    onEditClick={(index) =>
                                        console.log("Edit index:", index)
                                    }
                                    onDeleteClick={() =>
                                        setIsShowModalDelete(true)
                                    }
                                />
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
                    </div>
                    <div className={styles.footer}>
                        <p className={styles.footerText}>
                            Copyright © 2025 ThrashPlo | All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
