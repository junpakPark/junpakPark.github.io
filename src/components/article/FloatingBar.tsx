import type {MarkdownHeading} from 'astro';
import React, {useCallback, useEffect, useState} from 'react';

type NumberToStringMap = {
    [key: number]: string;
};

const numberToStringMap: NumberToStringMap = {
    1: 'one',
    2: 'two',
    3: 'three',
};

function getScrollTop() {
    if (!document.body) return 0;
    if (document.documentElement && 'scrollTop' in document.documentElement) {
        return document.documentElement.scrollTop || document.body.scrollTop;
    } else {
        return document.body.scrollTop;
    }
}

interface IHeadingTops {
    slug: string;
    top: number;
}

interface HeadingProps {
    headings: MarkdownHeading[];
}

const ScrollSpy: React.FC<HeadingProps> = ({headings}) => {
    const [activeToc, setActiveToc] = useState<string>('');
    const [headingTops, setHeadingTops] = useState<IHeadingTops[]>([]);

    const settingHeadingTops = useCallback(() => {
        const scrollTop = getScrollTop(); // 200 빼줌
        const headingTops = headings.map(({slug}) => {
            const el = document.getElementById(slug);
            const top = el ? el.getBoundingClientRect().top + scrollTop - 200 : 0;
            return {slug, top};
        });
        setHeadingTops(headingTops);
    }, [headings]);

    useEffect(() => {
        settingHeadingTops();
        let prevScrollHeight = document.body.scrollHeight;

        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const trackScrollHeight = () => {
            const scrollHeight = document.body.scrollHeight;
            if (prevScrollHeight !== scrollHeight) {
                settingHeadingTops();
            }
            prevScrollHeight = scrollHeight;
            timeoutId = setTimeout(trackScrollHeight, 250);
        };

        timeoutId = setTimeout(trackScrollHeight, 250);

        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
    }, [settingHeadingTops]);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = getScrollTop();
            if (!headingTops) return;
            const currentHeading = headingTops
                .slice()
                .reverse()
                .find((headingTop) => scrollTop >= headingTop.top - 4);

            if (currentHeading) {
                setActiveToc(currentHeading.slug);
            } else {
                setActiveToc('');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [headingTops]);

    const handleTocClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, tocSlug: string) => {
        event.preventDefault();
        const headerHeight = 150;
        const element = document.getElementById(tocSlug);
        if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({top: elementTop, behavior: 'smooth'});
        }
    }, []);

    return (
        <>
            {headings ? (
                <ul className="space-y-4">
                    {headings.map(heading => (
                        <li
                            data-level={numberToStringMap[heading.depth]}
                            key={heading.slug}
                        >
                            <a
                                href={`#${heading.slug}`}
                                onClick={(e) => handleTocClick(e, heading.slug)}
                                className={`text-sm leading-8 hover:text-gray-900 hover:font-medium  focus:outline-none ${activeToc === heading.slug ? "font-medium text-gray-900" : "text-gray-400"}`}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    );
}

const ButtonsCollection: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const scrollToBottom = () => {
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    };

    const copyCurrentUrl = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("URL copied to clipboard!"))
            .catch(err => console.error('Error copying URL: ', err));
    };

    return (
        <div className="flex gap-x-8">
            <button onClick={scrollToTop}
                    className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                <svg
                    className="flex-shrink-0 w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd" clipRule="evenodd"
                        d="M10.936 7.383C11.2182 7.13777 11.6009 7 12 7C12.3991 7 12.7818 7.13777 13.064 7.383L21.5775 14.7831C21.8517 15.0298 22.0034 15.3602 21.9999 15.7032C21.9965 16.0462 21.8382 16.3743 21.5592 16.6169C21.2802 16.8594 20.9027 16.997 20.5081 17C20.1135 17.0029 19.7334 16.8711 19.4495 16.6328L12 10.1575L4.55047 16.6328C4.26663 16.8711 3.88647 17.0029 3.49188 17C3.09728 16.997 2.71982 16.8594 2.44079 16.6169C2.16176 16.3743 2.00349 16.0462 2.00006 15.7032C1.99663 15.3602 2.14832 15.0298 2.42246 14.7831L10.936 7.383Z"
                        fill="currentColor"/>
                </svg>
            </button>
            <button onClick={copyCurrentUrl}
                    className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                <svg
                    className="flex-shrink-0 w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.4687 14.4648C10.5561 14.5519 10.6254 14.6554 10.6728 14.7694C10.7201 14.8833 10.7444 15.0055 10.7444 15.1289C10.7444 15.2523 10.7201 15.3745 10.6728 15.4884C10.6254 15.6024 10.5561 15.7059 10.4687 15.793L10.0046 16.257C9.12527 17.1364 7.9326 17.6304 6.689 17.6304C5.4454 17.6304 4.25274 17.1364 3.37338 16.257C2.49402 15.3777 2 14.185 2 12.9414C2 11.6978 2.49402 10.5051 3.37338 9.62578L5.25775 7.74219C6.10266 6.89519 7.23945 6.4033 8.43527 6.36728C9.63109 6.33126 10.7954 6.75383 11.6898 7.54843C11.7821 7.63051 11.8574 7.72997 11.9113 7.84113C11.9652 7.9523 11.9967 8.07299 12.0039 8.19632C12.0112 8.31964 11.9941 8.44319 11.9536 8.55991C11.9131 8.67663 11.85 8.78422 11.7679 8.87656C11.6858 8.9689 11.5864 9.04416 11.4752 9.09806C11.364 9.15196 11.2434 9.18343 11.12 9.19069C10.9967 9.19794 10.8731 9.18083 10.7564 9.14034C10.6397 9.09985 10.5321 9.03676 10.4398 8.95468C9.90347 8.47838 9.20544 8.22498 8.48847 8.24633C7.7715 8.26768 7.08978 8.56216 6.58275 9.06953L4.69994 10.9508C4.17241 11.4783 3.87604 12.1938 3.87604 12.9398C3.87604 13.6859 4.17241 14.4014 4.69994 14.9289C5.22747 15.4564 5.94296 15.7528 6.689 15.7528C7.43504 15.7528 8.15053 15.4564 8.67806 14.9289L9.14213 14.4648C9.2292 14.3777 9.33259 14.3085 9.4464 14.2613C9.56021 14.2142 9.68221 14.1899 9.80541 14.1899C9.92861 14.1899 10.0506 14.2142 10.1644 14.2613C10.2782 14.3085 10.3816 14.3777 10.4687 14.4648ZM16.2562 3.37109C15.3761 2.49308 14.1837 2 12.9406 2C11.6974 2 10.505 2.49308 9.62494 3.37109L9.16088 3.83515C8.98476 4.01127 8.88581 4.25014 8.88581 4.49922C8.88581 4.74829 8.98476 4.98716 9.16088 5.16328C9.337 5.3394 9.57587 5.43834 9.82494 5.43834C10.074 5.43834 10.3129 5.3394 10.489 5.16328L10.9531 4.69922C11.4806 4.17168 12.1961 3.87532 12.9421 3.87532C13.6882 3.87532 14.4037 4.17168 14.9312 4.69922C15.4587 5.22675 15.7551 5.94224 15.7551 6.68828C15.7551 7.43432 15.4587 8.14981 14.9312 8.67734L13.0476 10.5617C12.5401 11.0689 11.858 11.3629 11.1409 11.3837C10.4237 11.4045 9.72575 11.1504 9.18978 10.6734C9.09745 10.5914 8.98985 10.5283 8.87313 10.4878C8.75642 10.4473 8.63287 10.4302 8.50954 10.4374C8.38621 10.4447 8.26552 10.4762 8.15436 10.5301C8.04319 10.584 7.94373 10.6592 7.86166 10.7516C7.77958 10.8439 7.7165 10.9515 7.676 11.0682C7.63551 11.1849 7.6184 11.3085 7.62566 11.4318C7.63291 11.5551 7.66439 11.6758 7.71828 11.787C7.77218 11.8981 7.84745 11.9976 7.93978 12.0797C8.83352 12.8741 9.99707 13.2969 11.1923 13.2617C12.3876 13.2264 13.5242 12.7356 14.3695 11.8898L16.2538 10.0062C17.1329 9.12639 17.6268 7.93366 17.6273 6.68994C17.6277 5.44621 17.1346 4.25314 16.2562 3.37265V3.37109Z"
                        fill="currentColor"/>

                </svg>
            </button>
            <button onClick={scrollToBottom}
                    className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                <svg
                    className="flex-shrink-0 w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd" clipRule="evenodd"
                        d="M13.0805 16.6182C12.7988 16.8627 12.4168 17 12.0185 17C11.6201 17 11.2381 16.8627 10.9564 16.6182L2.4586 9.24185C2.31512 9.12156 2.20068 8.97768 2.12196 8.81859C2.04323 8.65951 2.00179 8.4884 2.00006 8.31527C1.99832 8.14213 2.03633 7.97043 2.11186 7.81018C2.18739 7.64993 2.29893 7.50434 2.43998 7.38191C2.58102 7.25948 2.74874 7.16266 2.93335 7.0971C3.11797 7.03154 3.31577 6.99854 3.51523 7.00005C3.71469 7.00155 3.9118 7.03752 4.09508 7.10586C4.27835 7.1742 4.44411 7.27354 4.58268 7.39808L12.0185 13.8526L19.4542 7.39808C19.7376 7.16055 20.117 7.02912 20.5109 7.0321C20.9047 7.03507 21.2815 7.1722 21.56 7.41396C21.8385 7.65572 21.9965 7.98277 21.9999 8.32465C22.0034 8.66654 21.852 8.99592 21.5783 9.24185L13.0805 16.6182Z"
                        fill="currentColor"/>
                </svg>

            </button>
        </div>
    );
};

const FloatingBar: React.FC<HeadingProps> = ({headings}) => {
    return (
        <div
            className="fixed top-[1rem] py-[16rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] overflow-y-auto hidden xl:block">
            <div className="space-y-2.5 px-8 font-sans text-sm">
                <ScrollSpy headings={headings}/>
                <ButtonsCollection/>
            </div>
        </div>

    )
};

export default FloatingBar;
