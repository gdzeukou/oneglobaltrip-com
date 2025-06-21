
const TrustBadges = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-8 opacity-70">
          <div className="text-center">
            <div className="font-bold text-blue-900 text-lg">IATA</div>
            <div className="text-sm text-gray-600">Certified Agent</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-900 text-lg">ASTA</div>
            <div className="text-sm text-gray-600">Member</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-900 text-lg">Allianz</div>
            <div className="text-sm text-gray-600">Partner</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
