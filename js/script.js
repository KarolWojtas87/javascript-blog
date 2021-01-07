'use strict';

{

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');

        /* remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /*  add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        console.log('clickedElement:', clickedElement);


        /*  remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');


        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }








    // TITLES




    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optAuthorSelector = '.post-author';

    function generateTitleLinks(customSelector = ' ') {
        const titleList = document.querySelector(optTitleListSelector);

        /* remove contents of titleList */
        titleList.innerHTML = ' ';
        let html = '';
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        console.log(html);
        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* get the title from the title element */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            /* create HTML of the link */
            titleList.insertAdjacentHTML("beforeend", linkHTML);

            /* insert link into titleList */
            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        console.log(links);

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();


    function generateTags() {
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const tagWrapper = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            let html = ' ';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            console.log(articleTags);
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* generate HTML of the link */
                const tagLink = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                /* add generated code to html variable */
                html = html + tagLink;
                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagWrapper.innerHTML = html;
            /* END LOOP: for every article: */
        }

    }
    generateTags();



    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.querySelectorAll('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for (let tagActiveLink of tagActiveLinks) {
            /* remove class active */
            tagActiveLink.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagFoundlings = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (let tagFoundling of tagFoundlings) {
            /* add class active */
            tagFoundling.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }



    function addClickListenersToTags() {
        /* find all links to tags */
        const tagLinks = document.querySelectorAll('.post-tags a');
        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }

    addClickListenersToTags();


    function generateAuthors() {
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
            const articleAuthor = article.querySelector(optAuthorSelector);
            const authorsName = article.getAttribute('authors-name');
            const authorHTML = '<li><a href="#tag-' + authorsName + '"><span>' + authorsName + '</span></a></li>'
            articleAuthor.innerHTML = authorHTML;
            console.log(authorHTML);
        }

    }
    generateAuthors();


    function addClickListenersToAuthors() {
        const authorLinks = document.querySelectorAll('.post-author a');
        for (let authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
    }
    addClickListenersToAuthors();



    function authorClickHandler(event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.querySelectorAll('href');
        const tag = href.replace('#tag-', '');
        const authorActiveLinks = documentSelectorAll('a.active[href^="#tag-"]');
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