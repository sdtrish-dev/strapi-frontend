    // ./frontend/src/app/[lang]/components/PostList.tsx
    
    import Image from "next/image";
    import Link from "next/link";
    import { getStrapiMedia, formatDate } from "../utils/api-helpers";
    
    interface Post {
      id: 4;
      attributes: {
        title: string;
        description: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        cover: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
        category: {
          data: {
            attributes: {
              name: string;
              slug: string;
            };
          };
        };
      };
    }
    
    export default function PostList({
      data: posts,
      children,
    }: {
      data: Post[];
      children?: React.ReactNode;
    }) {
      return ( 
        <>
        <div>Post Twister</div>
        <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const imageUrl = getStrapiMedia(
                post.attributes.cover.data?.attributes.url
              );
    
              const category = post.attributes.category.data?.attributes;
    
              return (
                <Link
                  href={`${category?.slug}/${post.attributes.slug}`}
                  key={post.id}
                  className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
                >
                  {imageUrl && (
                    <Image
                      alt="presentation"
                      width="240"
                      height="240"
                      className="object-cover w-full h-44 "
                      src={imageUrl}
                    />
                  )}
                  <div className="p-6 space-y-2 relative">
    
                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                      {post.attributes.title}
                    </h3>
    
                    <div className="flex justify-between items-center">
                      <span className="text-xs dark:text-gray-400">
                        {formatDate(post.attributes.publishedAt)}
                      </span>
                      
                    </div>
                    <p className="py-4">{post.attributes.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          {children && children}
        </section>
        </>
      );
    }