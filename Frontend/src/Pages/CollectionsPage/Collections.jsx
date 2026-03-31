import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Collections.scss';

import useCollections from '../../Hooks/useCollections';
import useItems from '../../Hooks/useItems';


const iconDefault = (
    <svg viewBox="0 0 24 24">
        <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
);

const Collections = () => {

    const navigate = useNavigate();

    const { context_collections, getCollectionsHandler, getCollectionItemsHandler } = useCollections();
    const { context_items, getItemsHandler } = useItems();

    const { Collections } = context_collections;
    const { Items } = context_items;

    useEffect(() => {
        getCollectionsHandler();
        getItemsHandler();
    }, []);


    // stats
    const totalItems = Items.length;
    const totalCollections = Collections.length;

    const today = new Date().toDateString();

    const addedToday =
        Items.filter(i =>
            new Date(i.createdAt).toDateString() === today
        ).length;


    // latest item
    const latestItem =
        Items.sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
        )[0];



    return (
        <div className="screen">

            <div className="screen__header">
                <div className="screen__eyebrow">Explore</div>
                <div className="screen__title">Collections</div>
            </div>


            <div className="screen__body">

                {/* stats */}
                <div className="stat-grid">

                    <div className="stat-card">
                        <div className="stat-card__label">Total items</div>
                        <div className="stat-card__value">{totalItems}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card__label">Collections</div>
                        <div className="stat-card__value">{totalCollections}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card__label">Added today</div>
                        <div className="stat-card__value">{addedToday}</div>
                    </div>

                </div>



                {/* collections grid */}
                <div className="collection-grid">

                    {Collections.map(col => (

                        <div
                            className="collection-card"
                            key={col._id}
                            onClick={() => {
                                navigate(`/collections/${col._id}`);
                            }}
                        >

                            <div className="collection-card__icon">
                                {iconDefault}
                            </div>

                            <div className="collection-card__name">
                                {col.name}
                            </div>

                            <div className="collection-card__count">
                                {col.itemCount || 0} items
                            </div>

                        </div>

                    ))}

                </div>



                {/* recent activity */}
                {latestItem && (

                    <div className="card">

                        <div className="card__title">
                            Recently added
                        </div>

                        <div className="card__sub">

                            "{latestItem.title}" added recently

                        </div>

                    </div>

                )}


            </div>
        </div>
    );

};

export default Collections;