import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { SearchIndexItem } from '../pages/search-index.json';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchIndexItem[]>([]);
    const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLUListElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 검색 인덱스 로드
    useEffect(() => {
        if (isOpen && searchIndex.length === 0) {
            setIsLoading(true);
            fetch('/search-index.json')
                .then((res) => res.json())
                .then((data: SearchIndexItem[]) => {
                    setSearchIndex(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [isOpen, searchIndex.length]);

    // 모달 열릴 때 input focus
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setQuery('');
            setResults([]);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // ESC로 닫기 & focus trap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // body 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // 검색 로직 (debounce)
    const search = useCallback((searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setSelectedIndex(0);
            return;
        }

        const lowerQuery = searchQuery.toLowerCase();
        const filtered = searchIndex.filter((item) => {
            return (
                item.title.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery) ||
                item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
            );
        });

        setResults(filtered);
        setSelectedIndex(0);
    }, [searchIndex]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            search(value);
        }, 300);
    };

    // 키보드 내비게이션
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                window.location.href = `/posts/${results[selectedIndex].slug}/`;
            }
        }
    };

    // 선택된 항목 스크롤
    useEffect(() => {
        if (resultsRef.current && results.length > 0) {
            const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
            selectedElement?.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex, results.length]);

    // 검색어 하이라이팅
    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) return text;

        const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <mark key={i} className="bg-purple-200 text-purple-900 rounded px-0.5">
                    {part}
                </mark>
            ) : part
        );
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="검색"
        >
            <div
                className="w-full max-w-xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 검색 입력 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                    <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="검색어를 입력하세요..."
                        className="flex-1 text-base outline-none placeholder-gray-400"
                        aria-label="검색어 입력"
                    />
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                        ESC
                    </kbd>
                </div>

                {/* 검색 결과 */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            로딩 중...
                        </div>
                    ) : query && results.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                            검색 결과가 없습니다.
                        </div>
                    ) : results.length > 0 ? (
                        <ul ref={resultsRef} role="listbox">
                            {results.map((result, index) => (
                                <li
                                    key={result.slug}
                                    role="option"
                                    aria-selected={index === selectedIndex}
                                >
                                    <a
                                        href={`/posts/${result.slug}/`}
                                        className={`block px-4 py-3 transition-colors ${
                                            index === selectedIndex
                                                ? 'bg-purple-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                        onClick={onClose}
                                    >
                                        <div className="font-medium text-gray-900">
                                            {highlightText(result.title, query)}
                                        </div>
                                        <div className="mt-1 text-sm text-gray-500 line-clamp-2">
                                            {highlightText(result.description, query)}
                                        </div>
                                        {result.tags.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {result.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                                    >
                                                        {highlightText(tag, query)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-6 text-center text-gray-400 text-sm">
                            제목, 설명, 태그로 검색할 수 있습니다.
                        </div>
                    )}
                </div>

                {/* 푸터 힌트 */}
                {results.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex gap-4">
                        <span><kbd className="px-1.5 py-0.5 bg-white border rounded">↑↓</kbd> 이동</span>
                        <span><kbd className="px-1.5 py-0.5 bg-white border rounded">Enter</kbd> 선택</span>
                        <span><kbd className="px-1.5 py-0.5 bg-white border rounded">ESC</kbd> 닫기</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
