import React from "react";
import Json from "../../../abbb.json"; // Make sure this file exists in `src`

// Function to count members at each level (up to Level 15)
const countMembersAtLevels = (node, level, levels) => {
  if (!node || level >= 15) return; // Stop counting after Level 15

  // Initialize the level count if it doesn't exist
  if (!levels[level]) {
    levels[level] = 0;
  }

  // Count the current node
  levels[level] += 1;

  // Recursively count children
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      countMembersAtLevels(child, level + 1, levels);
    });
  }
};

// Function to calculate single leg income (up to Level 15)
const calculateSingleLegIncome = (levels, incomePerMember) => {
  const commissionRates = [10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1]; // L1 to L15
  let totalIncome = 0;
  let totalCommission = 0;

  // Ensure we only calculate up to Level 15
  const maxLevels = Math.min(levels.length, 15);
  const incomeData = [];

  for (let index = 0; index < maxLevels; index++) {
    const members = levels[index] || 0; // Default to 0 if no members at this level
    const levelIncome = members * incomePerMember;
    const commission = (levelIncome * commissionRates[index]) / 100;
    totalIncome += levelIncome;
    totalCommission += commission;

    incomeData.push({
      level: `L${index + 1}`,
      members,
      incomePerMember: `$${incomePerMember}`,
      totalIncome: `$${levelIncome}`,
      commissionRate: `${commissionRates[index]}%`,
      yourIncome: `$${commission.toFixed(2)}`,
    });
  }

  return { incomeData, totalIncome: `$${totalIncome}`, totalCommission: `$${totalCommission.toFixed(2)}` };
};

const SingleLegIncomeCalculator = ({ treeData }) => {
  // Count members at each level (up to Level 15)
  const levels = [];
  countMembersAtLevels(treeData, 0, levels);

  // Calculate income
  const incomePerMember = 50; // $10 per member
  const { incomeData, totalIncome, totalCommission } = calculateSingleLegIncome(levels, incomePerMember);

  return (
    <div style={{ color: "white" }}>
      <h2>Single Leg Income Flow (Up to Level 15)</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Level</th>
            <th>Members</th>
            <th>Income per Member</th>
            <th>Total Income</th>
            <th>Commission Rate</th>
            <th>Your Income</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((data, index) => (
            <tr key={index}>
              <td>{data.level}</td>
              <td>{data.members}</td>
              <td>{data.incomePerMember}</td>
              <td>{data.totalIncome}</td>
              <td>{data.commissionRate}</td>
              <td>{data.yourIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Income: {totalIncome}</h3>
      <h3>Total Commission: {totalCommission}</h3>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <SingleLegIncomeCalculator treeData={Json} /> {/* Pass the JSON data as `treeData` */}
    </div>
  );
};

export default App;