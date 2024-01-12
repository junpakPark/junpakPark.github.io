import React, {useState} from 'react';
import {slugify} from "../utils";
import type {CollectionEntry} from 'astro:content';

type CarouselControlProps = {
    direction: 'prev' | 'next';
    onClick: () => void;
};

const CarouselControl: React.FC<CarouselControlProps> = ({direction, onClick}) => {
    return (
        <button
            type="button"
            className={`${direction === 'prev' ? 'start-0' : 'end-0'} hidden lg:block cursor-pointer shadow-inner drop-shadow-xl rounded-full text-white bg-[#640028]/5 hover:bg-[#640028]/15`}
            onClick={onClick}
            aria-label={direction === 'prev' ? 'Previous' : 'Next'}
        >
            <span className="inline-flex items-center justify-center w-10 h-10">
                <svg
                    className={`w-4 h-4  ${direction === 'next' ? 'rtl:rotate-180' : ''}`} aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path
                        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d={direction === 'prev' ? 'M5 1 1 5l4 4' : 'm1 9 4-4-4-4'}/>
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

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({totalSlides, currentSlide, goToSlide}) => {
    return (
        <div className="absolute flex -translate-x-1/2 bottom-4 left-1/2 space-x-3 rtl:space-x-reverse">
            {Array.from({length: totalSlides}).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`w-8 h-2 rounded-full ${index === currentSlide ? 'bg-gray-100' : 'bg-[#640028]/10'}`}
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

const CarouselItem: React.FC<CarouselItemProps> = ({serieses, isActive}) => {
    return (
        <div className={`flex justify-between p-4 mx-auto item-center flex-nowrap  ${isActive ? '' : 'hidden'}`}>
            {serieses.map((series, index) => (
                <a
                    key={index}
                    href={`/series/${slugify(series.data.title)}`}
                    className="relative rounded-lg border border-solid border-gray-500/[0.06] opacity-65 hover:opacity-100 shadow-md drop-shadow-xl hover:border-0 overflow-hidden w-64 mx-2 md:mx-4 lg:mx-8 h-36 md:h-72"
                >
                    <img
                        src={`/images/${series.data.imageUrl}`} alt={`${series.data.title} image`}
                        className="absolute h-auto  w-full md:h-full md:w-auto object-cover filter saturate-150 contrast-75 brightness-110"
                    />

                    <div
                        className="absolute w-full h-full flex flex-col justify-center items-center text-center"
                    >
                        <h2 className="text-white text-xl font-bold mb-1 md:text-2xl mx-auto whitespace-pre-wrap break-keep w-48 md:mb-2 ">{series.data.title}</h2>
                        <p className="text-white text-sm font-thin md:mt-4 whitespace-pre-wrap break-keep mx-auto">
                            {series.data.description}
                        </p>

                    </div>
                </a>
            ))}
        </div>
    );
};


type CarouselProps = {
    slides: CollectionEntry<'series'>[];
};

const Carousel: React.FC<CarouselProps> = ({slides}) => {
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
        return Array.from({length: Math.ceil(series.length / chunkSize)}, (_, i) =>
            series.slice(i * chunkSize, i * chunkSize + chunkSize)
        );
    };

    const groupedSeries = groupSeriesIntoChunks(slides);

    return (
        <div
            data-carousel="slide"
            className="max-w-screen-xl mx-auto h-full w-full"
        >
            <div
                className={`flex flex-nowrap overflow-x-scroll justify-center ${groupedSeries.length > 1 ? "lg:justify-between" : ""} mx-auto items-center h-full w-full`}>
                {groupedSeries.length > 1 ? <CarouselControl direction="prev" onClick={goToPrevious}/> : ""}
                <div>
                    {groupedSeries.map((slide, index) => (
                        <CarouselItem key={index} serieses={slide} isActive={index === currentSlide}/>))}
                </div>
                {groupedSeries.length > 1 ? <CarouselControl direction="next" onClick={goToNext}/> : ""}
            </div>
            {groupedSeries.length > 1 ?
                <CarouselIndicators totalSlides={groupedSeries.length} currentSlide={currentSlide}
                                    goToSlide={goToSlide}/> : ""}

        </div>
    );
};

export default Carousel;
