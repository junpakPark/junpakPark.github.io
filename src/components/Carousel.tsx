import React, { useState } from 'react';
import { slugify } from "../utils";
import type { CollectionEntry } from 'astro:content';

type CarouselControlProps = {
    direction: 'prev' | 'next';
    onClick: () => void;
};

const CarouselControl: React.FC<CarouselControlProps> = ({ direction, onClick }) => {
    return (
        <button
            type="button"
            className={`${direction === 'prev' ? 'start-0' : 'end-0'} hidden lg:block cursor-pointer group focus:outline-none rounded-full border border-transparent text-white bg-[#640028]/10 disabled:opacity-50 disabled:pointer-events-none`}
            onClick={onClick}
            aria-label={direction === 'prev' ? 'Previous' : 'Next'}
        >
            <span className="inline-flex items-center justify-center w-10 h-10">
                <svg className={`w-4 h-4  ${direction === 'next' ? 'rtl:rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={direction === 'prev' ? 'M5 1 1 5l4 4' : 'm1 9 4-4-4-4'} />
                </svg>
            </span>
        </button>
    );
};

type CarouselIndicatorsProps = {
    totalSlides: number;
    currentSlide: number;
    goToSlide: (slideIndex: number) => void;
};

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({ totalSlides, currentSlide, goToSlide }) => {
    return (
        <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`w-8 h-2 rounded-full ${index === currentSlide ? 'bg-gray-100/50' : 'bg-[#640028]/10'}`}
                    aria-current={index === currentSlide ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => goToSlide(index)}
                ></button>
            ))}
        </div>
    );
};

type CarouselItemProps = {
    serieses: CollectionEntry<'series'>[];
    isActive: boolean;
};

const CarouselItem: React.FC<CarouselItemProps> = ({ serieses, isActive }) => {
    return (
        <div className={`grid gap-2 lg:gap-8 grid-cols-3 ${isActive ? '' : 'hidden'}`}>
            {serieses.map((series, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center w-64 mx-auto h-36 md:h-72 mt-10 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    style={{
                        background: 'rgba(100, 0, 40, 0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <a href={`/series/${slugify(series.data.title)}`}>
                        <h2 className="text-[#F4F4FF] text-center text-3xl font-bold mb-2">{series.data.title}</h2>
                        <p className="text-[#F4F4FF] mt-4 text-sm font-thin text-center">
                            {series.data.description}
                        </p>
                    </a>
                </div>
            ))}
        </div>
    );
};


type CarouselProps = {
    slides: CollectionEntry<'series'>[];
};

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev === 0 ? groupedSeries.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev === groupedSeries.length - 1 ? 0 : prev + 1));
    };

    const groupSeriesIntoChunks = (series: CollectionEntry<'series'>[], chunkSize: number = 3): CollectionEntry<'series'>[][] => {
        return Array.from({ length: Math.ceil(series.length / chunkSize) }, (_, i) =>
            series.slice(i * chunkSize, i * chunkSize + chunkSize)
        );
    };

    const groupedSeries = groupSeriesIntoChunks(slides);

    return (
        <div
            data-carousel="slide"
            className="max-w-screen-xl mx-auto h-56 overflow-x-scroll rounded-lg md:h-96 transition ease-in-out"
        >
            <div className="flex flex-row mx-auto justify-center lg:justify-between items-center">
                <CarouselControl direction="prev" onClick={goToPrevious} />
                <div>
                    {groupedSeries.map((slide, index) => (<CarouselItem key={index} serieses={slide} isActive={index === currentSlide} />))}
                </div>

                <CarouselControl direction="next" onClick={goToNext} />
            </div>

            <CarouselIndicators totalSlides={groupedSeries.length} currentSlide={currentSlide} goToSlide={goToSlide} />
        </div>
    );
};

export default Carousel;
