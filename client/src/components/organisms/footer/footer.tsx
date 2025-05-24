import { ImgWhiteLogo } from "@/assets/images";
import styleCss from "../../../pages/LandingPage/LandingPage.module.css";
import { IcFacebook, IcInsta, IcTiktok } from "@/assets/icons";

export default function Footer() {
  return (
    <div className={styleCss.footer}>
      <div className={styleCss.upperFooter}>
        <div className={styleCss.leftFooter}>
          <div className={styleCss.textLogo}>
            <img src={ImgWhiteLogo} alt="Logo ThrashPlo" />
            <p className={styleCss.footerDesc}>Platform kolaboratif untuk menghubungkan masyarakat, komunitas, dan pemerintah dalam melaporkan, membersihkan, dan mengelola sampah secara berkelanjutan.</p>
          </div>
          <div className={styleCss.listSosmed}>
            <div className={styleCss.iconWrap}>
              <img src={IcFacebook} alt="Icon Facebook" />
            </div>
            <div className={styleCss.iconWrap}>
              <img src={IcInsta} alt="Icon Instagram" />
            </div>
            <div className={styleCss.iconWrap}>
              <img src={IcTiktok} alt="Icon Tiktok" />
            </div>
          </div>
        </div>
        <div className={styleCss.rightFooter}>
          <div>
            <h5 className={styleCss.topName}>PERUSAHAAN</h5>
            <p className={styleCss.bottomName}>Tentang Kami</p>
          </div>
          <div>
            <h5 className={styleCss.topName}>NAVIGASI</h5>
            <div className={styleCss.listBottom}>
              <p className={styleCss.bottomName}>
                <a href="#home">Home</a>
              </p>
              <p className={styleCss.bottomName}>
                <a href="#misi-kita">Misi Kita</a>
              </p>
              <p className={styleCss.bottomName}>
                <a href="#lapor-sampah">Laporkan Sampah</a>
              </p>
              <p className={styleCss.bottomName}>
                <a href="#aksi-bersih">Aksi Bersih</a>
              </p>
            </div>
          </div>
          <div>
            <h5 className={styleCss.topName}>PUSAT BANTUAN</h5>
            <div className={styleCss.listBottom}>
              <p className={styleCss.bottomName}>Jl. Raya Kb. Jeruk, Kota Jakarta Barat, 11540</p>
              <p className={styleCss.bottomName}>support.trashplo@gmail.com</p>
              <p className={styleCss.bottomName}>0811-2602-436</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styleCss.line}></div>
      <div className={styleCss.bottomFooter}>
        <p>© TrashPlo 2025 | All Right Reserved</p>
        <div className={styleCss.rightBottom}>
          <p>Syarat dan Ketentuan</p>
          <p>Kebijakan Privasi</p>
        </div>
      </div>
    </div>
  );
}
