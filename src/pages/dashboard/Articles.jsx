import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
//API
import { getArticles } from '../../api/articles';
//LAYOUT
import DashboardLayout from '../../pages/layouts/Dashboard';
//CONTAINERS
import ListArticles from '../../containers/articles/ListArticles';
//COMPONENTS
import FormArticle from '../../components/forms/article';

function Articles(props) {
      //HOOKS
      const params = useParams();
  
      //API
      const currentArticle = useQuery(
          ['article', params.id],
          (params) => {
              if (params.queryKey[1] !== undefined) return getArticles(params.queryKey[1]);
          },
          { enabled: false }
      );
  
      useEffect(() => {
          if (params.id !== undefined) currentArticle.refetch();
          //eslint-disable-next-line
      }, [params.id])

    return (
        <DashboardLayout>        
            <div>
                <FormArticle/>
                <main>
                    <div className='mx-4 sm:mx-0'>
                        <ListArticles />
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}

export default Articles;