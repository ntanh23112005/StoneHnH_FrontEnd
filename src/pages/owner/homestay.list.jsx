import { Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import HomestayCard from '../../components/owner/homestay.card';
import { getOwnerHomestays } from '../../services/owner/owner.api';

const OwnerHomestayList = () => {
    const [homestays, setHomestays] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchHomestays = async () => {
            try {
                const data = await getOwnerHomestays(user.customerId);
                const grouped = {};
                data.forEach(item => {
                    const id = item.homestayId;
                    if (!grouped[id]) {
                        grouped[id] = {
                            ...item,
                            images: []
                        };
                    }
                    grouped[id].images.push(item.homestayImage);
                });

                setHomestays(Object.values(grouped));
            } catch (err) {
                console.error("Lỗi khi gọi API homestay:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.customerId) {
            fetchHomestays();
        }
    }, [user]);

    return (
        <div>
            {loading ? (
                <Spin />
            ) : (
                <div className="grid">
                    {homestays.map(item => (
                        <HomestayCard key={item.homestayId} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerHomestayList;