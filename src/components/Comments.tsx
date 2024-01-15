import React, {useEffect} from 'react';

const COMMENT_ATTRIBUTES = {
    src: 'https://giscus.app/client.js',
    'data-repo': 'junpakPark/junpakPark.github.io',
    'data-repo-id': 'R_kgDOLBfvfQ',
    'data-category': 'Show and tell',
    'data-category-id': 'DIC_kwDOLBfvfc4CcUc-',
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

    const appendGiscusScript = () => {
        const giscusContainer = document.querySelector('#giscus');
        if (!giscusContainer) return;

        const script = document.createElement('script');
        Object.entries(COMMENT_ATTRIBUTES).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });
        giscusContainer.appendChild(script);
    }

    useEffect(() => {
        appendGiscusScript();
    }, []);

    return (
        <section
            id="giscus"
            className="border-t mt-8 pt-16 min-h-[372px]"
        ></section>
    );
};

export default Comments;
