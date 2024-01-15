import React, {useEffect, useRef} from 'react';

const COMMENT_ATTRIBUTES = {
    src: 'https://giscus.app/client.js',
    'data-repo': 'junpakPark/junpakPark.github.io',
    'data-repo-id': 'R_kgDOLBfvfQ',
    'data-category': 'General',
    'data-category-id': 'DIC_kwDOLBfvfc4CcUc7',
    'data-mapping': 'pathname',
    'data-strict': '1',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '1',
    'data-input-position': 'bottom',
    'data-lang': 'ko',
    'data-theme': 'noborder_light',
    crossorigin: 'anonymous',
    async: '',
};

const Comments: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const appendGiscusScript = () => {
        const currentRef = ref.current;
        if (!currentRef || currentRef.hasChildNodes()) return;

        const scriptElement = document.createElement('script');
        Object.entries(COMMENT_ATTRIBUTES).forEach(([key, value]) => {
            scriptElement.setAttribute(key, value);
        });

        currentRef.appendChild(scriptElement);

        // 컴포넌트 언마운트 시 스크립트 제거를 위한 클린업 함수
        return () => {
            if (currentRef) {
                currentRef.removeChild(scriptElement);
            }
        };
    }

    useEffect(() => {
        appendGiscusScript();
    }, []);

    return (
        <section
            ref={ref}
            className="border-t mt-8 pt-16 min-h-[372px]"
        ></section>
    );
};

export default Comments;
