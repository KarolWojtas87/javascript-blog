'use strict';
{
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
        authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
    }



    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optAuthorSelector = '.post-author',
        //optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optAuthorListSelector = '.list.authors';


    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        clickedElement.classList.add('active');

        const activeArticles = document.querySelectorAll('.post');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        const articleSelector = clickedElement.getAttribute('href');

        const targetArticle = document.querySelector(articleSelector);

        targetArticle.classList.add('active');
    }



    function generateTitleLinks(customSelector = ' ') {
        const titleList = document.querySelector(optTitleListSelector);

        titleList.innerHTML = ' ';
        let html = '';

        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        console.log(html);
        for (let article of articles) {

            const articleId = article.getAttribute('id');

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            const linkHTMLData = { id: articleId, title: articleTitle };
            const linkHTML = templates.articleLink(linkHTMLData);

            titleList.insertAdjacentHTML("beforeend", linkHTML);

            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    function calculateTagsParams(tags) {
        const params = { max: 0, min: 999999 };
        for (let tag in tags) {
            if (tags[tag] > params.max) {
                params.max = tags[tag];
            } else if (tags[tag] < params.min) {
                params.min = tags[tag];
            }
        }
        return params;
    }

    function calculateAuthorsParams(authors) {
        const params = { max: 0, min: 999999 };
        for (let author in authors) {
            if (authors[author] > params.max) {
                params.max = authors[author];
            } else if (authors[author] < params.min) {
                params.min = authors[author];
            }
        }
        return params;
    }



    function calculateTagClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        return optCloudClassPrefix + classNumber;
    }

    function calculateAuthorClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        return optCloudClassPrefix + classNumber;
    }


    function generateTags() {
        let allTags = {};
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {

            const tagWrapper = article.querySelector(optArticleTagsSelector);

            let html = ' ';

            const articleTags = article.getAttribute('data-tags');

            const articleTagsArray = articleTags.split(' ');

            for (let tag of articleTagsArray) {

                //const tagLink = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                const linkHTMLData = { id: tag, title: tag };
                const linkHTML = templates.tagLink(linkHTMLData);
                tagWrapper.insertAdjacentHTML("beforeend", linkHTML);

                html = html + linkHTML;

                if (!allTags.hasOwnProperty(tag)) {

                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            }
            tagWrapper.innerHTML = html;
        }

        const tagList = document.querySelector(".tags");
        const tagsParams = calculateTagsParams(allTags);

        const allTagsData = { tags: [] };

        for (let tag in allTags) {

            allTagsData.tags.push({ tag: tag, count: allTags[tag], className: calculateTagClass(allTags[tag], tagsParams) });
        }
        tagList.innerHTML = templates.tagCloudLink(allTagsData);

    }

    generateTags();




    function tagClickHandler(event) {

        event.preventDefault();

        const clickedElement = this;

        const href = clickedElement.getAttribute('href');

        const tag = href.replace('#tag-', '');

        const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

        for (let tagActiveLink of tagActiveLinks) {

            tagActiveLink.classList.remove('active');

        }

        const tagFoundlings = document.querySelectorAll('a[href="' + href + '"]');

        for (let tagFoundling of tagFoundlings) {

            tagFoundling.classList.add('active');

        }
        generateTitleLinks('[data-tags~="' + tag + '"]');

    }



    function addClickListenersToTags() {

        const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

        for (let tagLink of tagLinks) {

            tagLink.addEventListener('click', tagClickHandler);

        }
    }

    addClickListenersToTags();


    function generateAuthors() {
        let allAuthors = {};
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
            const articleAuthor = article.querySelector(optAuthorSelector);
            let html = '';
            const authorsName = article.getAttribute('authors-name');
            const authorHTML = '<li><a href="#tag-' + authorsName + '"><span>' + authorsName + '</span></a></li>'
            if (!allAuthors[authorsName]) {
                allAuthors[authorsName] = 1;
            } else {
                allAuthors[authorsName]++;
            }
            articleAuthor.innerHTML = authorHTML;
        }
        const authorList = document.querySelector(optAuthorListSelector);
        const authorParams = calculateAuthorsParams(allAuthors);
        const allAuthorsData = { authors: [] };

        console.log(allAuthors);
        for (let author in allAuthors) {
            allAuthorsData.authors.push({
                author: author,
                count: allAuthors[author],
                className: calculateAuthorClass(allAuthors[author], authorParams),
            });
        }
        authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    }
    generateAuthors();


    function addClickListenersToAuthors() {
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');
        for (let authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }

    }
    addClickListenersToAuthors();



    function authorClickHandler(event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const tag = href.replace('#author-', '');
        const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
        for (let authorActiveLink of authorActiveLinks) {
            authorActiveLink.classList.remove('active');
        }
        const authorFoundlings = document.querySelectorAll('a[href="' + href + '"]');
        for (let authorFoundling of authorFoundlings) {
            authorFoundling.classList.add('active');
        }
        generateTitleLinks('[authors-name="' + tag + '"]');
    }

}