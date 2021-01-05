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
        optArticleTagsSelector = '.post-tags .list';

    function generateTitleLinks() {
        const titleList = document.querySelector(optTitleListSelector);

        /* remove contents of titleList */
        titleList.innerHTML = ' ';
        let html = '';
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);

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
                const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
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

}