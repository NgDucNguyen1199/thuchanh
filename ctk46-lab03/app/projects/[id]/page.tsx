import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById } from "../../../data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projectId = Number(id);
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <article className="card stack">
      <p className="muted">
        <Link href="/projects">← Quay lại Dự án</Link>
      </p>
      <h2 className="title">{project.name}</h2>
      <p>{project.description}</p>
      <div className="badgeRow">
        {project.tech.map((item) => (
          <span className="badge" key={item}>
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

