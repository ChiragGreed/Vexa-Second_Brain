import './KnowledgeGraph.scss'
import GraphCard from '../../Components/KnowlegeGraphCards/GraphCard';
import useGraph from '../../Hooks/useGraph';


const KnowledgeGraph = () => {

  const { context_graph } = useGraph();
  const { Graph } = context_graph;


  return (
    <div className="kg-screen .screen">

      {/* Header */}
      <header className="kg-header">
        <div className="kg-header__eyebrow">Explore</div>
        <div className="kg-header__title">Knowledge Graph</div>
      </header>

      {/* Stats */}
      <div className="kg-stat-grid">
        <div className="kg-stat-card">
          <div className="kg-stat-card__label">Nodes</div>
          <div className="kg-stat-card__value">{Graph?.nodes?.length || 0}</div>
   
        </div>
        <div className="kg-stat-card">
          <div className="kg-stat-card__label">Connections</div>
          <div className="kg-stat-card__value">{Graph?.edges?.length || 0}</div>
        </div>
      </div>

      {/* Graph */}
        <GraphCard />

    </div>
  )
}

export default KnowledgeGraph