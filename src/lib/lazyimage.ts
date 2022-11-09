import { promiseTimeout } from './promises.js'
import { imageComplete } from './images.js'

export interface LazyImageOptions {
    root: Element | Document | null | undefined,
    rootMargin: string,
    threshold: number
    msCache: number
    cache: boolean
}

export async function lazyimage(node: HTMLImageElement, { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0, msCache = 25, cache = true }: Partial<LazyImageOptions> = {}) {
    const dataSrc = node.dataset?.src as string
    const dataAlt = (node.dataset?.alt || node.getAttribute('alt')) as string

    node.setAttribute('alt', dataAlt)

    const imageLoadOrCache = async () => {
        if (cache) {
            try {
                // check has cache when try get img under msCachhe milliseconds. if true, that perfectfly cached
                await promiseTimeout(msCache, imageComplete(dataSrc), 'Not Loaded from cache')
                node.src = dataSrc
                node.dispatchEvent(new CustomEvent('cacheload'))
            } catch (e) {
                node.src = dataSrc
                node.dispatchEvent(new CustomEvent('imgload'))
            }
        } else {
            node.src = dataSrc
            setTimeout(() => {
                // i don't know why if not do like this. event dispatch imgload from this else scope not working well
                node.dispatchEvent(new CustomEvent('imgload'))
            }, 0)
        }
    }

    // 	if intersection observer support
    if (window && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(async entry => {
                    if (entry.isIntersecting && entry.target === node) {
                        const image = entry.target as HTMLImageElement;

                        if (image.dataset.src) {
                            await imageLoadOrCache()
                        }

                        if (image.dataset.srcset) {
                            image.srcset = image.dataset.srcset;
                        }

                        observer.unobserve(image);
                    }
                });
            },
            {
                root,
                rootMargin,
                threshold,
            },
        );
        observer.observe(node);

        return {
            destroy() {
                if (observer) {
                    observer.unobserve(node);
                }
            },
        };
    } else {
        await imageLoadOrCache()
    }
}