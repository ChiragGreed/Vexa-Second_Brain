import './Resurfacing.scss'
import useItems from '../../Hooks/useItems';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Resurfacing = () => {

    const { context_items, resurfaceItemsHandler, getItemsHandler, getSingleItemHandler } = useItems();
    const { ResurfacedItems, Items } = context_items;
    const navigate = useNavigate();

    const [stats, setStats] = useState(0)

    useEffect(() => {
        resurfaceItemsHandler();
        getItemsHandler();
    }, [])



    // compute stats
    useEffect(() => {

        if (!Items) return;

        const today = new Date().toDateString()

        const dueToday = Items.filter(item =>

            new Date(item.createdAt).toDateString() === today

        ).length

        setStats(dueToday)

    }, [ResurfacedItems])




    return (
        <div className="screen">

            <div className="screen__header">

                <div className="screen__eyebrow">Explore</div>

                <div className="screen__title">

                    Resurfacing

                </div>

            </div>



            <div className="screen__body">

                <div className="stat-grid">

                    <div className="stat-card">

                        <div className="stat-card__label">

                            Due today

                        </div>

                        <div className="stat-card__value">

                            {stats}

                        </div>

                        <div className="stat-card__delta">

                            ↑ review now

                        </div>

                    </div>



                

                </div>



                {ResurfacedItems?.map(item => (

                    <div
                        className="resurface-item"
                        key={item._id}
                        onClick={async () => {
                            navigate(`/items/${item._id}`);
                        }}
                    >

                        <div className="resurface-item__dot" />



                        <div>

                            <div className="resurface-item__title">

                                {item.title}

                            </div>



                            <div className="resurface-item__meta">

                                {Math.floor((Date.now() - new Date(item.createdAt))
                                    / (1000 * 60 * 60 * 24)
                                )} Days ago
                            </div>



                            <div className="resurface-item__excerpt">

                                {item.summary}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
};

export default Resurfacing;