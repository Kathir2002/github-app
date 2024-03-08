import Repo from "./Repo";

const Repos = ({ repos }: any) => {
  return (
    <div className={`lg:w-2/3 w-full bg-glass rounded-lg px-8 py-6`}>
      <ol className="relative border-s border-gray-200">
        {repos?.map((repo: any, index: number) => (
          <Repo key={index} repo={repo} />
        ))}
        {repos?.length === 0 && (
          <p className="flex items-center justify-center h-32">
            No Repos Found
          </p>
        )}
      </ol>
    </div>
  );
};

export default Repos;
