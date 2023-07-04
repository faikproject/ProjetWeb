import { useQuery } from "react-query";
import { getArticles } from "../../api/articles";
//COMPONENTS
import CardArticle from "./CardArticle";
import { useEffect } from "react";

function ListArticles() {
    //API
    const articles = useQuery("dashboardArticles", getArticles);
    // services.refetch();
    return (
        <>
            {articles.isSuccess && (
                <div className="cards">
                    {articles.isSuccess && (
                        <div className="cards">
                            {Array.isArray(articles.data) && (
                                articles.data.map((article, index) => (
                                    <CardArticle article={article} refetch={articles.refetch} key={index} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default ListArticles;