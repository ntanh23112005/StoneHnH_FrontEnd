import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Button, Result, Spin } from "antd";
import { getAccountAPI } from "../services/auth/api.auth";

const PrivateRoute = ({ allowedRoles, children }) => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getAccountAPI();
                if (res?.data) {
                    setUser(res.data);
                }
            } catch (err) {
                console.log("Have Error, check log");
            }
            setLoading(false);
        };

        if (user && user.email) {
            setLoading(false);
        } else {
            fetchUser();
        }
    }, [user, setUser]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!user || !user.email) {
        return (
            <Result
                status="403"
                title="Unauthorized!"
                subTitle="Bạn cần đăng nhập để truy cập trang này"
                extra={
                    <Button type="primary">
                        <Link to="/login">
                            <span>Tới trang đăng nhập</span>
                        </Link>
                    </Button>
                }
            />
        );
    }

    // Nếu có yêu cầu phân quyền
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRole = user.roleName?.some(role => allowedRoles.includes(role));
        if (!hasRole) {
            return (
                <Result
                    status="403"
                    title="Forbidden!"
                    subTitle="Bạn không đủ quyền hạn để truy cập trang này"
                    extra={
                        <Button type="primary">
                            <Link to="/">
                                <span>Back to Home</span>
                            </Link>
                        </Button>
                    }
                />
            );
        }
    }

    // Được phép
    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;
