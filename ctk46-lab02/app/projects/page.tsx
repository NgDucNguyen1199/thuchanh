import Link from "next/link";
import { projects } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <section className="card stack">
      <h2 className="title">Dự án</h2>
      <p className="muted">Một số dự án tiêu biểu mình đã thực hiện trong quá trình học.</p>
      <ul className="list">
        {projects.map((project) => (
          <li className="listItem" key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
            <p>{project.description}</p>
            <div className="badgeRow">
              {project.tech.map((item) => (
                <span className="badge" key={`${project.id}-${item}`}>
                  {item}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

