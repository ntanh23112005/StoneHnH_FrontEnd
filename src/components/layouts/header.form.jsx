import { useContext, useEffect, useState } from 'react';
import { Input, Button, Switch, Dropdown, Avatar, message } from 'antd';
import {
    SearchOutlined,
    FilterOutlined,
    MenuOutlined,
    UserOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

import { AuthContext } from '../context/auth.context';
import { getAccountAPI, logoutAPI } from '../../services/auth/api.auth';
import { Icons } from '../../constants/icons';

const categories = [
    { url: '/category?category=homestay', label: 'Home Stay', icon: Icons.homeStay },
    { url: '/category?category=hotel', label: 'Khách sạn', icon: Icons.hotel },
    { url: '/category?category=mostlike', label: 'Yêu thích nhất', icon: Icons.mostLike },
    { url: '/category?category=savemoney', label: 'Tiết kiệm', icon: Icons.saveMoney },
    { url: '/category?category=nearsea', label: 'Gần biển', icon: Icons.viewBien },
];

const HeaderTop = () => {

    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    const { user, setUser } = useContext(AuthContext)
    const { showBeforeTax, setShowBeforeTax } = useContext(AuthContext);
    const location = useLocation();
    const currentCategory = new URLSearchParams(location.search).get('category') || 'all';
    const [areaAddress, setAreaAddress] = useState();
    const [maxCustomer, setMaxCustomer] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const res = await getAccountAPI();
        if (res != null) {
            setUser(res.data);
        }
    }

    const isLoggedIn = !!user;
    const getUserMenuItems = () => {
        if (!isLoggedIn) {
            return [
                {
                    key: 'login',
                    label: <Link to="/login">Đăng nhập</Link>,
                },
            ];
        }

        const items = [
            {
                key: 'profile',
                label: <Link to="/profile">Hồ sơ</Link>,
            },
            {
                key: 'settings',
                label: <Link to="/settings">Cài đặt</Link>,
            },
        ];

        if (Array.isArray(user?.roleName) && user.roleName.includes('ROLE_ADMIN')) {
            items.push({
                key: 'admin',
                label: <Link to="/admin">Quản trị</Link>,
            });
        }

        items.push({
            key: 'logout',
            label: (
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}
                >
                    Đăng xuất
                </Link>
            ),
        });

        return items;
    };



    const handleLogout = async () => {
        try {
            const res = await logoutAPI()
            // console.log(res);
            if (res.data.message) {
                localStorage.removeItem("access_token");
                setUser(null);

                message.success("Đăng xuất thành công")
                // navigate("/");
            }
        } catch (err) {
            console.warn("Logout error:", err);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('areaAddress') || '';
        const customer = params.get('maxCustomer') || '';

        setAreaAddress(area);
        setMaxCustomer(customer);
    }, [location.search]);

    const handleSearch = () => {
        const currentParams = new URLSearchParams(location.search);
        const category = currentParams.get('category') || 'all';

        const newParams = new URLSearchParams();
        newParams.set('category', category);
        newParams.set('areaAddress', areaAddress || '');
        newParams.set('maxCustomer', maxCustomer || 0);

        navigate(`/category?${newParams.toString()}`);
    }


    return (
        <div className="stonehnh-header">
            {/* Top Header */}
            <div className="header-top">
                {/* Logo */}
                <div><Link to={'/'} style={{ textDecoration: 'none' }}>
                    <img src="/src/assets/logo/logo stone-03.svg" alt="" style={{ width: "250px", height: "100px" }} />
                </Link></div>

                {/* Search Bar */}
                <div className="search-bar">
                    <fieldset className="search-fieldset">
                        <legend className="search-legend">Địa điểm</legend>
                        <Input
                            placeholder="Tìm kiếm điểm đến"
                            variant="borderless"
                            className="search-input"
                            value={areaAddress}
                            onChange={(e) => setAreaAddress(e.target.value)}
                            onPressEnter={handleSearch}
                        />
                    </fieldset>
                    <span>|</span>
                    <fieldset className="search-fieldset">
                        <legend className="search-legend">Số lượng khách</legend>
                        <Input
                            placeholder="Số lượng khách hàng thuê"
                            variant="borderless"
                            className="search-input"
                            value={maxCustomer}
                            onChange={(e) => setMaxCustomer(e.target.value)}
                            onPressEnter={handleSearch}
                        />
                    </fieldset>
                    <Button
                        shape="circle"
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ backgroundColor: '#0079b5', borderColor: '#0079b5' }}
                        onClick={handleSearch}
                        onPressEnter={handleSearch}
                    />
                </div>

                {/* Admin & Host & User */}
                <div className="user-section">
                    <Link to="/owner" className="host-link">Đón tiếp khách</Link>
                    <Dropdown
                        key={user ? user.email : 'guest'}
                        menu={{ items: getUserMenuItems() }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <div className="user-menu">
                            <MenuOutlined style={{ fontSize: 20 }} />
                            <Avatar
                                src={
                                    user?.customerPicture
                                        ? (
                                            /^https?:\/\//.test(user.customerPicture)
                                                ? user.customerPicture
                                                : `${VITE_IMG_BACKEND_URL}/avatar/${user.customerPicture.replace(/^\/+/, "")}?t=${Date.now()}`
                                        )
                                        : null
                                }
                                icon={<UserOutlined />}
                                style={{ backgroundColor: '#ccc' }}
                            />
                        </div>
                    </Dropdown>
                </div>
            </div>

            {/* Category Bar */}
            <div className="category-bar">
                <div className="categories">
                    {categories.map((cat, idx) => {
                        const targetCategory = new URLSearchParams(cat.url.split('?')[1]).get('category');

                        return (
                            <NavLink
                                key={idx}
                                to={cat.url}
                                className={`category-item ${currentCategory === targetCategory ? 'active-category' : ''}`}
                            >
                                <div className="category-content">
                                    <img src={cat.icon} alt={cat.label} className="category-icon" />
                                    <span className="category-label">{cat.label}</span>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>

                <div className="filter-section">
                    <div className="price-toggle">
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={showBeforeTax}
                            onClick={() => { setShowBeforeTax(!showBeforeTax) }}
                        />
                        <span>Hiện giá trước thuế</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;