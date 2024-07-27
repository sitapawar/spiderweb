import * as XLSX from 'xlsx';

const processWorkbookData = (workbook) => {
    const nodesSheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    const edgesSheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);
  
    const nodes = nodesSheet.map((node, index) => ({
      id: index,
      label: node.label,
      title: node.title,
      group: node.group,
    }));
  
    const nameToIdMap = nodes.reduce((acc, node) => {
      acc[node.name] = node.id;
      return acc;
    }, {});
  
    const links = edgesSheet.map(edge => ({
      from: nameToIdMap[edge.from_name],
      to: nameToIdMap[edge.to_name],
      label: edge.relationship_label,
    }));
  
    return { nodes, links };
  };
  
  export default processWorkbookData;