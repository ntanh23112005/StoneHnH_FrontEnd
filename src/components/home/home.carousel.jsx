import { ArrowRightOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const destinations = [
    { src: "/images/home/homepage-vungtau.jpg", title: "Thailand" },
    { src: "/images/home/homepage-vungtau.jpg", title: "Vietnam" },
    { src: "/images/home/homepage-vungtau.jpg", title: "Singapore" },
    { src: "/images/home/homepage-vungtau.jpg", title: "Japan" },
    { src: "/images/home/homepage-vungtau.jpg", title: "Korea" },
    { src: "/images/home/homepage-vungtau.jpg", title: "France" },
];

const HomeCarousel = () => {
    const navigate = useNavigate();

    return (
        <>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Chúng tôi luôn đồng hành</h2>
            <p style={{ textAlign: 'center', fontStyle: 'italic', margin: "20px 0" }}>
                Mỗi cuộc hành trình, dù dài hay ngắn, đều bắt đầu từ những bước đi đầu tiên
            </p>

            <Marquee pauseOnHover speed={25} gradient={false}>
                {destinations.map((item, index) => (
                    <div key={index} style={{ margin: "0 20px", textAlign: "center" }}>
                        <img
                            src={item.src}
                            alt={item.title}
                            style={{
                                width: "250px",
                                height: "200px",
                                borderRadius: "25px",
                                objectFit: "cover",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        />
                        <p style={{ marginTop: "10px", fontWeight: 600 }}>{item.title}</p>
                    </div>
                ))}
            </Marquee>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px"
            }}>
                {/* Nút bên dưới */}
                <button
                    onClick={() => navigate("/category/home-stay")}
                    style={{
                        marginTop: "40px",
                        padding: "18px 50px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        borderRadius: "30px",
                        border: "none",
                        backgroundColor: "#028ad4",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#90b6d4")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#028ad4")}
                >
                    Khám phá ngay <ArrowRightOutlined
                        style={{ fontWeight: 'bold', fontSize: '20px' }} />
                </button>
            </div>
        </>
    );
}

export default HomeCarousel;