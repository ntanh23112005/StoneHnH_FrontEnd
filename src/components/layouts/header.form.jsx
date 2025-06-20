import React, { useContext, useEffect } from 'react';
import { Input, Button, Switch, Dropdown, Avatar } from 'antd';
import {
    SearchOutlined,
    FilterOutlined,
    MenuOutlined,
    UserOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './header.css';

import ahi from '../../assets/react.svg';
import HomeStayIcon from '../../assets/menu-bar/home-stay.svg';
import HotelIcon from '../../assets/menu-bar/hotel.svg';
import MostLikeIcon from '../../assets/menu-bar/most-like.svg';
import SaveMoneyIcon from '../../assets/menu-bar/save-money.svg';
import ViewBienIcon from '../../assets/menu-bar/view-bien.svg';
import { AuthContext } from '../context/auth.context';

const userMenuItems = [
    {
        key: '1',
        label: <Link to="/profile">Hồ sơ</Link>,
    },
    {
        key: '2',
        label: <Link to="/settings">Cài đặt</Link>,
    },
    {
        key: '3',
        label: <Link to="/logout">Đăng xuất</Link>,
    },
];

const categories = [
    { url: '/category?category=homestay', label: 'Home Stay', icon: HomeStayIcon },
    { url: '/category?category=hotel', label: 'Khách sạn', icon: HotelIcon },
    { url: '/category?category=mostlike', label: 'Yêu thích nhất', icon: MostLikeIcon },
    { url: '/category?category=savemoney', label: 'Tiết kiệm', icon: SaveMoneyIcon },
    { url: '/category?category=nearsea', label: 'Gần biển', icon: ViewBienIcon },
];

const HeaderTop = () => {

    const { showBeforeTax, setShowBeforeTax } = useContext(AuthContext);

    const location = useLocation();
    const currentCategory = new URLSearchParams(location.search).get('category') || 'all';

    return (
        <div className="stonehnh-header">
            {/* Top Header */}
            <div className="header-top">
                {/* Logo */}
                <div><Link to={'/'} style={{ textDecoration: 'none' }}>STONEHNH</Link></div>

                {/* Search Bar */}
                <div className="search-bar">
                    <fieldset className="search-fieldset">
                        <legend className="search-legend">Địa điểm</legend>
                        <Input placeholder="Tìm kiếm điểm đến" variant='borderless' className="search-input" />
                    </fieldset>
                    <span>|</span>
                    <fieldset className="search-fieldset">
                        <legend className="search-legend">Số lượng khách</legend>
                        <Input placeholder="Số lượng khách hàng thuê" variant='borderless' className="search-input" />
                    </fieldset>
                    <Button
                        shape="circle"
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ backgroundColor: '#0079b5', borderColor: '#0079b5' }}
                    />
                </div>

                {/* Host & User */}
                <div className="user-section">
                    <Link to="/" className="host-link">Đón tiếp khách</Link>
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <div className="user-menu">
                            <MenuOutlined style={{ fontSize: 20 }} />
                            <Avatar src={ahi} icon={<UserOutlined />} style={{ backgroundColor: '#ccc' }} />
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
                    <Button size="large" icon={<FilterOutlined />}>Bộ lọc</Button>
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